import { gql } from '@apollo/client/core';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import {
  clearUserRefreshTokensMutation,
  getGqlOperationName,
  Logger,
  LoggingTypeEnum,
  NotificationCreateMutationArgs,
  PlatformClientService,
  PlatformNotificationClientService,
  PlatformUserClientService,
} from '@roq/core';
import { print } from 'graphql/language/printer';
import { UserTokenTypeEnum } from 'src/auth/enums';
import { AuthService } from 'src/auth/services';
import { applicationConfig } from 'src/config';
import { UserInvitesCreateDto } from 'src/platformClient/dtos';
import { CreateUserInvitesModel, UserPlatformInviteModel } from 'src/platformClient/models';
import { AcceptUserInviteDto } from 'src/userInvite/dtos';
import { CheckUserInviteTokenModel, UserInviteModel } from 'src/userInvite/models';

@Injectable()
export class UserInviteService {
  constructor(
    private readonly platformUserClientService: PlatformUserClientService,
    private platformNotificationClientService: PlatformNotificationClientService,
    private readonly authService: AuthService,
    @Inject(applicationConfig.KEY)
    private readonly appConfig: ConfigType<typeof applicationConfig>,
    private readonly logger: Logger,
    private readonly platformClientService: PlatformClientService,
  ) {}

  async checkUserInviteToken(token: string): Promise<CheckUserInviteTokenModel> {
    return this.platformUserClientService.checkUserInviteToken(token);
  }

  async acceptUserInvite(acceptInvite: AcceptUserInviteDto): Promise<UserInviteModel> {
    const { password, token, locale, timezone } = acceptInvite;

    const acceptedInvite = await this.platformUserClientService.acceptUserInvite({ acceptUserInvite: { token } });
    const { email, firstName, lastName } = acceptedInvite;
    const user = await this.authService.register(
      {
        firstName,
        lastName,
        locale,
        email,
        password,
        timezone,
      },
      { emailConfirmed: true, optedIn: true },
    );
    await this.platformUserClientService.updateUserInvite(
      { id:acceptedInvite.id, userInvite:{ acceptedByUserId: user.roqIdentifier } });
    const notificationData: NotificationCreateMutationArgs = {
      key: 'user-info',
      entities: [{ uuid: user.roqIdentifier, type: 'user' }],
      recipients: {
        allUsers: true,
        excludedUserIds: [user.roqIdentifier],
      },
    };
    await this.platformNotificationClientService.createNotification(notificationData);
    return acceptedInvite;
  }

  public async clearUserRefreshTokens(userId: string): Promise<void> {
    const variables = {
      userId,
      type: UserTokenTypeEnum.REFRESH,
    };

    const loggingRequest = {
      graphql: print(clearUserRefreshTokensMutation),
      variables,
      operationName: getGqlOperationName(clearUserRefreshTokensMutation),
    };
    this.logger.log({
      type: LoggingTypeEnum.outgoingMutation,
      request: loggingRequest,
    });

    await this.platformUserClientService.clearUserRefreshTokens(userId);
  }

  public async sendUserInvites(userInvites: UserInvitesCreateDto): Promise<CreateUserInvitesModel> {
    const { data: data } = await this.platformClientService.request({
      mutation: gql`
        mutation CreateUserInvites($userInvites: UserInvitesCreateDto!) {
          sendUserInvites(userInvites: $userInvites) {
            success {
              id
              email
              firstName
              lastName
              status
              createdAt
            }
            errors {
              error
              email
            }
          }
        }
      `,
      variables: {
        userInvites,
      },
    });

    return data?.sendUserInvites;
  }

  public async resendUserInvite(id: string): Promise<UserPlatformInviteModel> {
    const { data: data } = await this.platformClientService.request({
      mutation: gql`
        mutation ResendUserInvite($id: ID!) {
          resendUserInvite(id: $id) {
            id
            status
            userToken {
              id
              validTill
              userId
              user {
                id
                email
              }
            }
            createdByUserId
            createdBy {
              id
              email
            }
            userTokenId
          }
        }
      `,
      variables: {
        id,
      },
    });

    return data.resendUserInvite;
  }

  public async cancelUserInvite(id: string): Promise<UserPlatformInviteModel> {
    const { data: data } = await this.platformClientService.request({
      mutation: gql`
        mutation CancelUserInvite($id: ID!) {
          cancelUserInvite(id: $id) {
            id
            status
            statusUpdatedAt
          }
        }
      `,
      variables: {
        id,
      },
    });

    return data?.cancelUserInvite;
  }
}
