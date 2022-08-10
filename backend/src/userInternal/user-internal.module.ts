// eslint-disable-next-line @roq/filename-suffix-mismatch
import { Global, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { BaseMultipleEntityLoader, BaseSingleEntityLoader, DataLoaderInterceptor, EventModule, LibraryModule, Logger, PlatformClientModule, PlatformNotificationClientModule, PlatformSpaceClientModule, PlatformUserClientModule } from '@roq/core';
import { UserModule } from 'src/user';
import { UserInternalListener } from 'src/userInternal/listeners';
import { UserInternalAvatarLoader, UserInternalLastLoginActivityLoader } from 'src/userInternal/loaders';
import { UserInternalResolver, UserLoginHistoryInternalResolver } from 'src/userInternal/resolvers';
import { UserInternalCronService, UserInternalService } from 'src/userInternal/services';
import { UserInviteModule } from 'src/userInvite';

@Global()
@Module({
  imports: [
    EventModule,
    LibraryModule,
    UserModule,
    UserInviteModule,
    PlatformSpaceClientModule,
    PlatformClientModule,
    PlatformUserClientModule,
    PlatformNotificationClientModule,
  ],
  providers: [
    Logger,
    UserInternalAvatarLoader,
    UserInternalLastLoginActivityLoader,
    UserInternalListener,
    UserLoginHistoryInternalResolver,
    UserInternalResolver,
    UserInternalService,
    UserInternalCronService,
    {
      provide: APP_INTERCEPTOR,
      useClass: DataLoaderInterceptor,
    },
    BaseSingleEntityLoader,
    BaseMultipleEntityLoader,
  ],
  exports: [UserInternalService],
  controllers: [],
})
export class UserInternalModule {}
