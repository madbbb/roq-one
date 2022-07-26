import { Injectable, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorEntity } from 'src/example/entities';
import { AuthorRepository } from 'src/example/repositories';
import { BaseSingleEntityLoader } from 'src/library/loaders';

@Injectable({ scope: Scope.REQUEST })
export class AuthorLoader extends BaseSingleEntityLoader<AuthorEntity> {
  constructor(
    @InjectRepository(AuthorRepository)
    private readonly authorRepository: AuthorRepository,
    private readonly configService: ConfigService
  ) {
    super(authorRepository);
  }
}
