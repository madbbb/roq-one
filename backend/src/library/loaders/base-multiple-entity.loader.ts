import { NestDataLoader } from '@roq/nestjs-dataloader';
import * as DataLoader from 'dataloader';

import { ArrayLoaderResponseInterface, QueryInterface } from '../interfaces';
import { BaseRepository } from '../repositories';

export class BaseMultipleEntityLoader<T> implements NestDataLoader<QueryInterface, ArrayLoaderResponseInterface<T>> {
  protected readonly repository: BaseRepository<T>;
  protected readonly relationProperty: string;

  constructor(repository: BaseRepository<T>, relationProperty: string) {
    this.repository = repository;
    this.relationProperty = relationProperty;
  }

  generateDataLoader(): DataLoader<QueryInterface,
    ArrayLoaderResponseInterface<T>> {
    return new DataLoader<QueryInterface,
      ArrayLoaderResponseInterface<T>>(
      async (query: QueryInterface[]) => {
        const ids = query.reduce(
          (acc, cur) => [...acc, cur.filter[this.relationProperty].equalTo],
          []
        );
        const q = {
          limit: query[0].limit,
          offset: query[0].offset,
          fields: query
            .reduce((acc, cur) => [...acc, ...cur.fields], [])
            .filter((field, i, arr) => arr.findIndex((f) => f === field) === i),
          filter: {
            ...query?.[0].filter,
            [this.relationProperty]: {
              valueIn: ids,
            }
          }
        };
        return this.repository.getLoaderEntitiesAndCount(ids, this.relationProperty, q);
      },
    );
  }
}
