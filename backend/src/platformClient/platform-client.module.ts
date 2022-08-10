/* eslint-disable @roq/filename-suffix-mismatch */
import { CacheModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ApolloClientModule,
  Logger,
  PlatformClientModule as BasePlatformClientModule,
  PlatformClientService,
  PlatformHttpClientService,
  PlatformServiceAccountClientService,
} from '@roq/core';
import { PlatformClientResolver } from 'src/platformClient/resolvers';

@Module({
  imports: [
    BasePlatformClientModule,
    ApolloClientModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        host: configService.get('application.platform.graphqlUri'),
        headers: {}
      }),
      imports: [],
      inject: [ConfigService],
    }),
    CacheModule.register({
      useFactory: async (configService: ConfigService) => ({
        ttl: configService.get('application.serviceAccount.cache.ttl'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    PlatformClientService,
    PlatformHttpClientService,
    PlatformClientResolver,
    Logger,
    PlatformServiceAccountClientService,
  ],
  exports: [PlatformClientService, PlatformHttpClientService, PlatformServiceAccountClientService],
  controllers: [],
})
export class PlatformClientModule {}
