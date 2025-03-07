import {   BooleanFilterInterface,
  DateFilterInterface,
  IdFilterInterface,
  OrderEnum,
  QueryFilterInterface,
  QueryInterface,
  StringFilterInterface,
 } from '@roq/core';
import { UserOrderSortEnum, UserSearchKeyEnum } from 'src/user/enums';

export interface UserFindQueryInterface extends QueryInterface {
  order?: {
    order: OrderEnum;
    sort: UserOrderSortEnum;
  };
  search?: {
    value: string;
    key: UserSearchKeyEnum;
  };
  filter?: QueryFilterInterface & {
    email?: StringFilterInterface;
    password?: StringFilterInterface;
    phone?: StringFilterInterface;
    firstName?: StringFilterInterface;
    lastName?: StringFilterInterface;
    locale?: StringFilterInterface;
    timezone?: StringFilterInterface;
    roqIdentifier?: StringFilterInterface;
    optedInAt?: DateFilterInterface;
    active?: BooleanFilterInterface;
    sync?: BooleanFilterInterface;
    userLoginHistoryId?: IdFilterInterface;
  };
}
