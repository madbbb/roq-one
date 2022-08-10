/* eslint-disable @roq/filename-suffix-mismatch */
import { ConfigService } from '@nestjs/config';
import { createLogger } from '@roq/core';
import { BootstrapConsole } from 'nestjs-console';
import { AppModule } from 'src/app.module';

const bootstrap = new BootstrapConsole({
  module: AppModule,
  useDecorators: true,
});
process.env.IS_CONSOLE_COMMAND = 'true';
bootstrap
  .init()
  .then(async (app) => {
    const configService = app.get(ConfigService);
    app.useLogger(createLogger(configService));
    await app.init();
    await bootstrap.boot();
    process.exit(0);
  })
  .catch(() => process.exit(1));
