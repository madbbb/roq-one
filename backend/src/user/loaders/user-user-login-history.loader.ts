import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseMultipleEntityLoader } from 'src/library/loaders';
import { UserLoginHistoryEntity } from 'src/user/entities';
import { UserLoginHistoryRepository } from 'src/user/repositories';

@Injectable({ scope: Scope.REQUEST })
export class UserUserLoginHistoryLoader extends BaseMultipleEntityLoader<UserLoginHistoryEntity> {
  constructor(
    @InjectRepository(UserLoginHistoryRepository)
    private readonly userLoginHistoryRepository: UserLoginHistoryRepository,
  ) {
    super(userLoginHistoryRepository, 'userId');
  }
}
