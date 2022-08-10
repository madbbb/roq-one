import { Module } from '@nestjs/common';
import {
  Logger,
  PlatformClientModule as BasePlatformClientModule,
  PlatformNotificationClientModule,
  PlatformUserClientModule,
} from '@roq/core';
import { AuthModule } from 'src/auth';
import { UserModule } from 'src/user';
import { UserInviteResolver } from 'src/userInvite/resolvers';
import { UserInviteService } from 'src/userInvite/services';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PlatformUserClientModule,
    PlatformNotificationClientModule,
    BasePlatformClientModule,
  ],
  providers: [UserInviteResolver, UserInviteService, Logger],
  exports: [UserInviteService],
})
export class UserInviteModule {}
