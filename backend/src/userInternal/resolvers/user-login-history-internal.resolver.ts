import { Args, Info, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { ParseUUIDStringPipe, SingleLoader, UtilityService } from '@roq/core';
import { plainToClass } from 'class-transformer';
import * as DataLoader from 'dataloader';
import { GraphQLResolveInfo } from 'graphql';
import { UserLoginHistoryNotFoundException } from 'src/library/exception';
import {
  UserLoginHistoryArgType,
} from 'src/user/dtos';
import { UserEntity } from 'src/user/entities';
import { UserFindQueryInterface } from 'src/user/interfaces';
import { UserLoginHistoryModel, UserLoginHistoryPageModel, UserModel } from 'src/user/models';
import { UserLoginHistoryRepository, UserRepository } from 'src/user/repositories';
import { UserLoginHistoryService } from 'src/user/services';

@Resolver(() => UserLoginHistoryModel)
export class UserLoginHistoryInternalResolver {
  constructor(
    @InjectRepository(UserLoginHistoryRepository)
    private readonly userLoginHistoryRepository: UserLoginHistoryRepository,
    private readonly userLoginHistoryService: UserLoginHistoryService,
    private readonly utilityService: UtilityService,
  ) {}

  @Query(() => UserLoginHistoryModel)
  async userLoginHistory(
    @Args({ name: 'id', type: () => String }, ParseUUIDStringPipe) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<UserLoginHistoryModel> {
    const fields = this.utilityService.getInfoFields(info);
    const userLoginHistoryEntity = await this.userLoginHistoryService.findById(id, {
      fields,
    });

    if (!userLoginHistoryEntity) {
      throw new UserLoginHistoryNotFoundException({ variables: { id } });
    }

    return plainToClass(UserLoginHistoryModel, userLoginHistoryEntity);
  }

  @Query(() => UserLoginHistoryPageModel)
  async userLoginHistories(
    @Args({ type: () => UserLoginHistoryArgType }) args: UserLoginHistoryArgType,
    @Info() info: GraphQLResolveInfo,
  ): Promise<UserLoginHistoryPageModel> {
    const fields = this.utilityService.getInfoFields(info);
    const [userLoginHistoryEntities, totalCount] = await this.userLoginHistoryService.findAndCount({ ...args, fields });
    return {
      totalCount,
      data: userLoginHistoryEntities.map((userLoginHistoryEntity) =>
      plainToClass(UserLoginHistoryModel, userLoginHistoryEntity),
      ),
    };
  }

  /**
   * Many-to-One Relation. There is userLoginHistory  in one user.
   */
  @ResolveField(() => UserModel)
  async user(
    @Parent() userLoginHistoryModel: UserLoginHistoryModel,
    @SingleLoader(UserRepository) userLoader: DataLoader<UserFindQueryInterface, UserEntity>,
    @Info() info: GraphQLResolveInfo,
  ): Promise<UserModel> {
    const fields = this.utilityService.getInfoFields(info);
    const userEntity = await userLoader.load({ filter: { id: { equalTo: userLoginHistoryModel.userId } }, fields });
    return plainToClass(UserModel, userEntity);
  }
}
