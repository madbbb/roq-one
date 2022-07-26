import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseSingleEntityLoader } from 'src/library/loaders';
import { UserLoginHistoryEntity } from 'src/user/entities';
import { UserLoginHistoryRepository } from 'src/user/repositories';

@Injectable({ scope: Scope.REQUEST })
export class UserLoginHistoryLoader extends BaseSingleEntityLoader<UserLoginHistoryEntity> {
  constructor(
    @InjectRepository(UserLoginHistoryRepository)
    private readonly userLoginHistoryRepository: UserLoginHistoryRepository
  ) {
    super(userLoginHistoryRepository);
  }
}
