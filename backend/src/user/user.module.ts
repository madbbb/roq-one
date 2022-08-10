import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityListenerModule, LibraryModule } from '@roq/core';
import { camelCase } from 'lodash';
import { UserEntity, UserLoginHistoryEntity } from 'src/user/entities';
import { UserLoginHistoryRepository, UserRepository } from 'src/user/repositories';
import { UserLoginHistoryService, UserService } from 'src/user/services';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, UserRepository, UserLoginHistoryEntity, UserLoginHistoryRepository]),
    LibraryModule,
    EntityListenerModule.registerAsync([
      {
        name: UserEntity.name,
        useFactory: async (configService: ConfigService) => ({
          entity: UserEntity,
          excludedFields: configService.get(`application.entityListener.excludedFields.${camelCase(UserEntity.name)}`),
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [UserService, UserLoginHistoryService],
  exports: [TypeOrmModule, UserService, UserLoginHistoryService],
  controllers: [],
})
export class UserModule {}
