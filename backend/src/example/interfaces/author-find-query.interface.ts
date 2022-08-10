import {   DateFilterInterface,
  IdFilterInterface,
  IntFilterInterface,
OrderEnum,
  QueryFilterInterface,
  QueryInterface,
  StringFilterInterface,
 } from '@roq/core';
import { AuthorOrderSortEnum, AuthorSearchKeyEnum } from 'src/example/enums';

export interface AuthorFindQueryInterface extends QueryInterface {
  order?: {
    order: OrderEnum;
    sort: AuthorOrderSortEnum;
  };
  search?: {
    value: string;
    key: AuthorSearchKeyEnum;
  };
  filter?: QueryFilterInterface & {
    name?: StringFilterInterface;
    surname?: StringFilterInterface;
    age?: IntFilterInterface;
    birthDate?: DateFilterInterface;
    email?: StringFilterInterface;
    gender?: StringFilterInterface;
    bookId?: IdFilterInterface;
  };
}
