import { BaseRepository } from '@roq/core';
import { AuthorEntity } from 'src/example/entities';
import { AuthorFindQueryInterface } from 'src/example/interfaces';
import { EntityRepository, SelectQueryBuilder } from 'typeorm';

@EntityRepository(AuthorEntity)
export class AuthorRepository extends BaseRepository<AuthorEntity> {
  buildSelectQuery(
    query?: AuthorFindQueryInterface
  ): SelectQueryBuilder<AuthorEntity> {
    return super.buildSelectQuery(query);
  }
}
