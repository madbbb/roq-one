import {   DateFilterInterface,
  IdFilterInterface,
  OrderEnum,
  QueryFilterInterface,
  QueryInterface,
  StringFilterInterface,
} from '@roq/core';
import { UserLoginHistoryOrderSortEnum, UserLoginHistorySearchKeyEnum } from 'src/user/enums';

export interface UserLoginHistoryFindQueryInterface extends QueryInterface {
  order?: {
    order: OrderEnum;
    sort: UserLoginHistoryOrderSortEnum;
  };
  search?: {
    value: string;
    key: UserLoginHistorySearchKeyEnum;
  };
  filter?: QueryFilterInterface & {
    ip?: StringFilterInterface;
    host?: StringFilterInterface;
    timestamp?: DateFilterInterface;
    userId?: IdFilterInterface;
  };
}
