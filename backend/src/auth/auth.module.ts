import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { EventModule, Logger, PlatformClientModule, PlatformMailClientModule, PlatformUserClientModule } from '@roq/core';
import { AuthResolver, SessionResolver } from 'src/auth/resolvers';
import { AuthService } from 'src/auth/services';
import { ApiKeyStrategy, JwtRefreshStrategy, JwtStrategy } from 'src/auth/strategies';
import { UserModule } from 'src/user';

@Module({
  imports: [
    EventModule,
    JwtModule.register({}),
    PassportModule,
    PlatformClientModule,
    PlatformUserClientModule,
    PlatformMailClientModule,
    UserModule,
  ],
  providers: [AuthService, AuthResolver, ApiKeyStrategy, JwtStrategy, JwtRefreshStrategy, SessionResolver, Logger],
  exports: [AuthService],
})
export class AuthModule {}
