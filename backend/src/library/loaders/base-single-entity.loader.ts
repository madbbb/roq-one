import { NestDataLoader } from '@roq/nestjs-dataloader';
import * as DataLoader from 'dataloader';
import { BaseRepository } from 'src/library/repositories';

import { QueryInterface } from '../interfaces';

export class BaseSingleEntityLoader<T> implements NestDataLoader<QueryInterface, T> {
  protected readonly repository: BaseRepository<T>;
  protected readonly relationProperty = 'id';

  constructor(repository: BaseRepository<T>) {
    this.repository = repository;
  }

  generateDataLoader(): DataLoader<QueryInterface, T> {
    return new DataLoader<QueryInterface, T>(
      async (query: QueryInterface[]) => {
        const ids = query.reduce((acc, cur) => [...acc, cur.filter[this.relationProperty].equalTo], []);
        const data = await this.repository
          .buildSelectQuery({
            fields: query
              .reduce((acc, cur) => [...acc, ...cur.fields], [])
              .filter((field, i, arr) => arr.findIndex((f) => f === field) === i),
            filter: { [this.relationProperty]: { valueIn: ids } },
          })
          .getMany();
        return Promise.resolve(ids.map((id) => data.find((record: any) => record[this.relationProperty] === id)));
      },
    );
  }
}
