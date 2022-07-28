import { ConfigService } from '@nestjs/config';
import { CommandOptions } from 'commander';
import * as csv from 'csvtojson';
import * as fs from 'fs';
import { Command, Console } from 'nestjs-console';
import * as path from 'path';
import { gql } from 'apollo-server-express';
import { platformEventSubscribers } from 'src/config';
import { ImportService } from 'src/import/services';
import { LoggingTypeEnum } from 'src/logger/enums';
import { Logger } from 'src/logger/services';
import { PlatformServiceAccountClientService } from 'src/platformClient/services';
import { Connection, getConnection } from 'typeorm';
import { v4 } from 'uuid';

@Console()
export class ImportConsole {
  constructor(
    private logger: Logger,
    private importService: ImportService,
    private configService: ConfigService,
    private platformServiceAccountClientService: PlatformServiceAccountClientService,
  ) {}

  @Command({
    command: 'import-entities',
    description: 'Seed data',
    options: [
      {
        required: false,
        flags: '--flush',
      }
    ],
  })
  async importData(
    options: CommandOptions & { flush?: boolean; initial?: boolean; dbConnection?: Connection },
  ): Promise<void> {
    let flush = false;
    if (options && Object.keys(options).includes('flush') && options.flush === true) {
      flush = true;
    }
    const connection: Connection = options.dbConnection || getConnection();
    const configuration = this.configService.get('application.importDataConfigs');
    this.logger.log({
      type: LoggingTypeEnum.importData,
      message: 'ROQ One import seed configuration',
      data: {
        configuration
      }
    });
    await this.importEntities(flush, connection, configuration[0]);
  }

  async importEntities(flush: boolean, connection: Connection, source: string): Promise<void> {
    try {
      const directory = `../../../data/${source}`;
      if (!fs.existsSync(path.join(__dirname, directory))) {
        return Promise.resolve();
      }
      this.logger.log({
        type: LoggingTypeEnum.importData,
        message: `Reading of files started for ${source}`,
      });
      const files = fs.readdirSync(path.join(__dirname, directory));

      const data = {};
      for (const file of files) {
        const extension = path.extname(file);
        const entityName = path.basename(file, extension);
        if (!connection.hasMetadata(entityName)) {
          continue;
        }
        data[entityName] = await csv({ flatKeys: true }).fromFile(
          path.join(path.join(__dirname, directory), `${entityName}${extension}`),
        );
      }
      this.logger.log({
        type: LoggingTypeEnum.importData,
        message: 'Reading of files done',
      });
      await this.importService.importData(data, flush);
    } catch (err) {
      this.logger.log({
        type: LoggingTypeEnum.importData,
        data: {
          stack: err.stack,
          message: err.message,
          response: err.response,
        },
        message: `Reading of files failed for ${source}`,
      });
      process.exit(1);
    }
  }
  @Command({
    command: 'import-event-subscribers',
    description: 'Importing event subscribers',
  })
  public async importEventSubscribers(): Promise<void> {
    const requestId = v4();
    const requestCaller = this.configService.get('application.appName');
    const headers = {};
    headers[this.configService.get('application.platform.requestIdHeader')] = requestId;
    headers[this.configService.get('application.platform.requestCallerHeader')] = requestCaller;
    const variables = platformEventSubscribers;
    await this.platformServiceAccountClientService.request(
      {
        mutation: gql`
          mutation eventSyncEventSubscribers($data: [EventSubscriberCreateDto!]!) {
            eventSyncEventSubscribers(data: $data)
          }
        `,
        variables: {
          data: variables,
        },
      },
      null,
      headers,
    );
  }
}
