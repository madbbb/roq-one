import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseSingleEntityLoader } from 'src/library/loaders';
import { UserEntity } from 'src/user/entities';
import { UserRepository } from 'src/user/repositories';

@Injectable({ scope: Scope.REQUEST })
export class UserLoader extends BaseSingleEntityLoader<UserEntity> {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {
    super(userRepository);
  }
}
