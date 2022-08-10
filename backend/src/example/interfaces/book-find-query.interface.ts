import {   BooleanFilterInterface,
  DateFilterInterface,
  IdFilterInterface,
OrderEnum,
  QueryFilterInterface,
  QueryInterface,
  StringFilterInterface,
 } from '@roq/core';
import { BookOrderSortEnum, BookSearchKeyEnum } from 'src/example/enums';

export interface BookFindQueryInterface extends QueryInterface {
  order?: {
    order: OrderEnum;
    sort: BookOrderSortEnum;
  };
  search?: {
    value: string;
    key: BookSearchKeyEnum;
  };
  filter?: QueryFilterInterface & {
    title?: StringFilterInterface;
    publishingDate?: DateFilterInterface;
    description?: StringFilterInterface;
    published?: BooleanFilterInterface;
    outOfStock?: BooleanFilterInterface;
    authorId?: IdFilterInterface;
  };
}
