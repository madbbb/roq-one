import { registerEnumType } from '@nestjs/graphql';

export enum UserOrderSortEnum {
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  EMAIL = 'email',
  PHONE = 'phone',
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
  LOCALE = 'locale',
  TIMEZONE = 'timezone',
  ROQ_IDENTIFIER = 'roqIdentifier',
  OPTED_IN_AT = 'optedInAt',
  ACTIVE = 'active',
  SYNC = 'sync',
}

registerEnumType(UserOrderSortEnum, {
  name: 'UserOrderSortEnum',
});
