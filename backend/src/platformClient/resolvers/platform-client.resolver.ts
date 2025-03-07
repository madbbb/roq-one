import { gql } from '@apollo/client/core';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  BulkDeleteFilterArgType,
  FileStatusEnum,
  ParseUUIDStringPipe,
  PlatformClientService,
  PlatformHttpClientService,
} from '@roq/core';
import { plainToClass } from 'class-transformer';
import { FileUpdateDto, NotificationTypeUserPreferenceUpsertDto } from 'src/platformClient/dtos';
import {
  NotificationTypeCategoryModel,
  NotificationTypeCategoryPageModel,
  NotificationTypeUserPreferenceModel,
  NotificationWebModel,
} from 'src/platformClient/models';
import { UserFileModel } from 'src/userInternal/models';

import { NotificationTypeCategoryArgType } from '../dtos/notification-type-category.arg.type';

@Resolver()
export class PlatformClientResolver {
  constructor(
    private readonly platformHttpClientService: PlatformHttpClientService,
    private readonly platformClientService: PlatformClientService,
  ) {}

  @Query(() => String)
  async mailHealthCheck(): Promise<string> {
    const response = await this.platformClientService.request(
      {
        query: gql`
          {
            mailHealthCheck
          }
        `,
      },
      'mailHealthCheck',
    );
    return JSON.stringify(response);
  }

  @Query(() => String)
  async searchHealthCheck(): Promise<string> {
    const response = await this.platformClientService.request(
      {
        query: gql`
          {
            searchHealthCheck
          }
        `,
      },
      'searchHealthCheck',
    );

    return JSON.stringify(response);
  }

  @Query(() => String)
  async spaceHealthCheck(): Promise<string> {
    const response = await this.platformClientService.request(
      {
        query: gql`
          {
            spaceHealthCheck
          }
        `,
      },
      'spaceHealthCheck',
    );

    return JSON.stringify(response);
  }

  @Query(() => String)
  async notificationHealthCheck(): Promise<string> {
    const response = await this.platformClientService.request(
      {
        query: gql`
          {
            notificationHealthCheck
          }
        `,
      },
      'notificationHealthCheck',
    );

    return JSON.stringify(response);
  }

  @Query(() => String)
  async workflowHealthCheck(): Promise<string> {
    const response = await this.platformClientService.request(
      {
        query: gql`
          {
            workflowHealthCheck
          }
        `,
      },
      'workflowHealthCheck',
    );

    return JSON.stringify(response);
  }

  @Query(() => String)
  async userHealthCheck(): Promise<string> {
    const response = await this.platformClientService.request(
      {
        query: gql`
          {
            userHealthCheck
          }
        `,
      },
      'userHealthCheck',
    );

    return JSON.stringify(response);
  }

  @Query(() => String)
  async dataHealthCheck(): Promise<string> {
    const response = await this.platformClientService.request(
      {
        query: gql`
          {
            dataHealthCheck
          }
        `,
      },
      'dataHealthCheck',
    );
    return JSON.stringify(response);
  }

  @Query(() => String)
  async contentHealthCheck(): Promise<string> {
    const response = await this.platformClientService.request(
      {
        query: gql`
          {
            contentHealthCheck
          }
        `,
      },
      'contentHealthCheck',
    );

    return JSON.stringify(response);
  }

  @Query(() => String)
  async chatHealthCheck(): Promise<string> {
    const response = await this.platformClientService.request(
      {
        query: gql`
          {
            chatHealthCheck
          }
        `,
      },
      'chatHealthCheck',
    );

    return JSON.stringify(response);
  }

  @Mutation(() => [String])
  async deleteFiles(@Args({ type: () => BulkDeleteFilterArgType }) args: BulkDeleteFilterArgType): Promise<string[]> {
    const { data: data } = await this.platformClientService.request({
      mutation: gql`
        mutation DeleteFiles($filter: DeleteFilterArgType) {
          deleteFiles(filter: $filter)
        }
      `,
      variables: {
        filter: args.filter,
      },
    });

    return data?.deleteFiles;
  }

  @Mutation(() => UserFileModel, { nullable: true })
  async updateFile(
    @Args({ name: 'fileId', type: () => ID }, ParseUUIDStringPipe) fileId: string,
    @Args({ name: 'updateFileDto', type: () => FileUpdateDto })
    updateFileDto: FileUpdateDto,
  ): Promise<UserFileModel> {
    const { data: data } = await this.platformClientService.request({
      mutation: gql`
        mutation updateFile($fileId: ID!, $updateFileDto: FileUpdateDto!) {
          updateFile(fileId: $fileId, updateFileDto: $updateFileDto) {
            id
            name
          }
        }
      `,
      variables: {
        fileId,
        updateFileDto,
      },
    });
    return data?.updateFile;
  }

  @Mutation(() => UserFileModel, { nullable: true })
  async makeFilePublic(
    @Args({ name: 'fileId', type: () => ID }, ParseUUIDStringPipe) id: string,
  ): Promise<UserFileModel> {
    const { data: data } = await this.platformClientService.request({
      mutation: gql`
        mutation makeFilePublic($id: ID!) {
          makeFilePublic(fileId: $id) {
            id
            url
            isPublic
          }
        }
      `,
      variables: {
        id,
      },
    });

    return data?.makeFilePublic;
  }

  @Mutation(() => UserFileModel, { nullable:true })
  async makeFilePrivate(@Args({ name: 'fileId', type: () => ID }, ParseUUIDStringPipe) id: string): Promise<UserFileModel> {
    const { data:data } = await this.platformClientService.request(
      {
        mutation: gql`
        mutation makeFilePrivate($id: ID!) {
          makeFilePrivate(fileId: $id) {
            id
            url
            isPublic
          }
        }
    `,
      variables: {
        id
      },
      },
    );

    return data?.makeFilePrivate;
  }

  @Mutation(() => UserFileModel, { nullable:true })
  async updateFileStatus(
    @Args({ name: 'fileId', type: () => ID }, ParseUUIDStringPipe) fileId: string,
    @Args({ name: 'status', type: () => FileStatusEnum }) status: FileStatusEnum,
  ): Promise<UserFileModel> {
    const { data: data } = await this.platformClientService.request({
      mutation: gql`
        mutation UpdateFileStatusMutation($fileId: ID!, $status: FileStatusEnum!) {
          updateFileStatus(fileId: $fileId, status: $status) {
            id
            status
            url
          }
        }
      `,
      variables: {
        fileId,
        status,
      },
    });

    return data.updateFileStatus;
  }

  @Mutation(() => Boolean)
  async markAllAsReadNotification(): Promise<boolean> {
    const { data: data } = await this.platformClientService.request({
      mutation: gql`
        mutation MarkAllAsReadNotification {
          markAllAsReadNotification
        }
      `,
    });

    return data?.markAllAsReadNotification;
  }

  @Mutation(() => NotificationWebModel, { nullable: true })
  async markAsUnreadNotification(
    @Args({ name: 'id', type: () => ID }, ParseUUIDStringPipe) id: string,
  ): Promise<NotificationWebModel> {
    const { data: data } = await this.platformClientService.request({
      mutation: gql`
        mutation markAsUnreadNotification($id: ID!) {
          markAsUnreadNotification(id: $id) {
            id
            read
          }
        }
      `,
      variables: {
        id,
      },
    });

    return data?.markAsUnreadNotification;
  }

  @Mutation(() => NotificationWebModel, { nullable: true })
  async markAsReadNotification(
    @Args({ name: 'id', type: () => ID }, ParseUUIDStringPipe) id: string,
  ): Promise<NotificationWebModel> {
    const { data: data } = await this.platformClientService.request({
      mutation: gql`
        mutation markAsReadNotification($id: ID!) {
          markAsReadNotification(id: $id) {
            id
            read
          }
        }
      `,
      variables: {
        id,
      },
    });

    return data?.markAsReadNotification;
  }

  @Mutation(() => NotificationTypeUserPreferenceModel, { nullable: true })
  async upsertNotificationTypeUserPreference(
    @Args({
      name: 'notificationTypeUserPreference',
      type: () => NotificationTypeUserPreferenceUpsertDto,
    })
    notificationTypeUserPreferenceData: NotificationTypeUserPreferenceUpsertDto,
  ): Promise<NotificationTypeUserPreferenceModel> {
    const { data: data } = await this.platformClientService.request({
      mutation: gql`
        mutation UpsertNotificationTypeUserPreference(
          $web: Boolean!
          $mail: Boolean!
          $notificationTypeId: ID!
          $id: ID
        ) {
          upsertNotificationTypeUserPreference(
            notificationTypeUserPreference: { id: $id, web: $web, mail: $mail, notificationTypeId: $notificationTypeId }
          ) {
            id
            web
            mail
            key
            userId
            notificationTypeId
          }
        }
      `,
      variables: {
        ...notificationTypeUserPreferenceData,
      },
    });

    return data?.upsertNotificationTypeUserPreference;
  }

  @Query(() => NotificationTypeCategoryPageModel)
  async notificationTypeCategories(
    @Args({ type: () => NotificationTypeCategoryArgType })
    args: NotificationTypeCategoryArgType,
  ):  Promise<NotificationTypeCategoryPageModel> {

    const { data:data } = await this.platformClientService.request(
      {
        query: gql`
        query notificationTypeCategories {
          notificationTypeCategories {
            data {
              id
              key
              description
              notificationTypes {
                data {
                  id
                  key
                  description
                  defaultUserActiveWeb
                  defaultUserActiveMail
                  notificationTypeUserPreferences {
                    data {
                      id
                      key
                      web
                      mail
                      userId
                      notificationTypeId
                    }
                  }
                }
              }
            }
          }
        }
      `,
      variables: {
        args,
      },
    });

    return {
      totalCount: data.totalCount,
      data: data.notificationTypeCategories.data.map((notificationTypeCategoryEntity) =>
        plainToClass(NotificationTypeCategoryModel, notificationTypeCategoryEntity),
      ),
    };
  }
}
