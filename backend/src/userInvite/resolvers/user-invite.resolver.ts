import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ParseUUIDStringPipe } from '@roq/core';
import { UserInvitesCreateDto } from 'src/platformClient/dtos';
import {
  CreateUserInvitesModel,
  UserPlatformInviteModel,
} from 'src/platformClient/models';
import { AcceptUserInviteDto } from 'src/userInvite/dtos';
import { CheckUserInviteTokenModel, UserInviteModel } from 'src/userInvite/models';
import { UserInviteService } from 'src/userInvite/services';

@Resolver(() => UserInviteModel)
export class UserInviteResolver {
  constructor(
    private readonly userInviteService: UserInviteService,
  ) {}

  @Query(() => CheckUserInviteTokenModel)
  async checkUserInviteToken(
    @Args({ name: 'token', type: () => String }) token: string,
  ): Promise<CheckUserInviteTokenModel> {
    return this.userInviteService.checkUserInviteToken(token);
  }

  @Mutation(() => UserInviteModel)
  async acceptUserInvite(
    @Args({ name: 'acceptUserInvite', type: () => AcceptUserInviteDto })
    acceptUserInvite: AcceptUserInviteDto,
  ): Promise<UserInviteModel> {
    return this.userInviteService.acceptUserInvite(acceptUserInvite);
  }

  @Mutation(() => CreateUserInvitesModel, { nullable: true })
  async sendUserInvites(
    @Args({ name: 'userInvites', type: () => UserInvitesCreateDto })
    userInvites: UserInvitesCreateDto,
  ): Promise<CreateUserInvitesModel> {
    return this.userInviteService.sendUserInvites(userInvites);
  }

  @Mutation(() => UserPlatformInviteModel, { nullable: true })
  async resendUserInvite(
    @Args({ name: 'id', type: () => ID }, ParseUUIDStringPipe) id: string,
  ): Promise<UserPlatformInviteModel> {
    return this.userInviteService.resendUserInvite(id);
  }

  @Mutation(() => UserPlatformInviteModel, { nullable: true })
  async cancelUserInvite(
    @Args({ name: 'id', type: () => ID }, ParseUUIDStringPipe) id: string,
  ): Promise<UserPlatformInviteModel> {
    return this.userInviteService.cancelUserInvite(id);
  }
}
