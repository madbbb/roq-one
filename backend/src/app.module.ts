import {
  Inject,
  MethodNotAllowedException,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  EventModule,
  ExceptionService,
  ImportConsole,
  ImportModule,
  Logger,
  LoggerInterceptor,
  PlatformSpaceClientModule,
  queryDepthValidation,
  RequestShareInterceptor,
} from '@roq/core';
import { ClsInterceptor, ClsModule } from 'nestjs-cls';
import { ConsoleModule } from 'nestjs-console';
import { join } from 'path';
import { AuthModule } from 'src/auth';
import { applicationConfig, validationSchema } from 'src/config';
import * as platformEventSubscribers from 'src/config/platform-events.json';
import { ExampleModule } from 'src/example';
import { PlatformClientModule } from 'src/platformClient';
import { TestSetupModule } from 'src/testSetup';
import { UserModule } from 'src/user';
import { UserInternalModule } from 'src/userInternal';
import { UserInviteModule } from 'src/userInvite';

import { AppController } from './app.controller';

@Module({
  imports: [
    ConsoleModule,
    ConfigModule.forRoot({
      validationSchema,
      load: [applicationConfig],
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: (appConfig: ConfigType<typeof applicationConfig>) => ({
        type: 'postgres',
        url: appConfig.databaseUrl,
        autoLoadEntities: true,
        migrations: ['dist/migrations/*.js'],
        cli: {
          migrationsDir: 'src/migrations',
        },
        logging: !appConfig.isProd,
        // TODO: stream logger to provider in production
        logger: 'file',
        synchronize: false,
        extra: {
          queryLimit: appConfig.queryLimit,
          defaultLanguage: appConfig.defaultLanguage,
          max: 10,
          collationLocales: appConfig.collationLocales,
        },
      }),
      inject: [applicationConfig.KEY],
    }),
    GraphQLModule.forRootAsync({
      useFactory: (appConfig: ConfigType<typeof applicationConfig>) => {
        const plugins = [];
        if (appConfig.newrelic) {
          // eslint-disable-next-line @typescript-eslint/no-require-imports,@typescript-eslint/no-var-requires
          const NewRelicPlugin = require('@newrelic/apollo-server-plugin');
          plugins.push(NewRelicPlugin);
        }
        return {
          context: ({ req, res }) => ({ req, res }),
          formatError: ExceptionService.formatGqlErrors,
          autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
          sortSchema: true,
          debug: true,
          allowBatchedHttpRequests: false,
          playground: true,
          fieldResolverEnhancers: ['guards', 'interceptors', 'filters'],
          buildSchemaOptions: {},
          path: appConfig.apiUri,
          plugins,
          validationRules: [queryDepthValidation(appConfig.queryDepthLimit, appConfig.queryDepthIgnoreFields)],
        };
      },
      inject: [applicationConfig.KEY],
    }),
    ClsModule.register({
      global: true,
    }),
    PlatformClientModule,
    EventModule,
    PlatformSpaceClientModule,
    UserModule,
    AuthModule,
    UserInternalModule,
    UserInviteModule,
    ImportModule,
    ExampleModule,
    TestSetupModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_PIPE,
      useFactory: () => new ValidationPipe({ skipUndefinedProperties: true, stopAtFirstError: true }),
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClsInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestShareInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
    Logger,
  ],
})
export class AppModule implements NestModule {
  constructor(
    @Inject(applicationConfig.KEY)
    private readonly appConfig: ConfigType<typeof applicationConfig>,
    importConsole: ImportConsole,
  ) {
    if (!appConfig.isConsoleCommand) {
      void importConsole.importEventSubscribers(platformEventSubscribers);
    }
  }

  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply((req, res, next) => {
        const { query } = req.query;
        if (query) {
          next(new MethodNotAllowedException('GET method is not allowed.'));
        } else {
          next();
        }
      })
      .forRoutes({ path: this.appConfig.apiUri, method: RequestMethod.GET });
  }
}
