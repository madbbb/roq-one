import { ArgsType, Field } from '@nestjs/graphql';
import { ValidateNested } from '@roq/class-validator';
import { BaseArgType } from '@roq/core';
import { Type } from 'class-transformer';
import { UserFilterArgType, UserOrderArgType, UserSearchArgType } from 'src/user/dtos';

@ArgsType()
export class UserBulkArgType extends BaseArgType {
  @Field(() => UserSearchArgType, { nullable: true })
  @ValidateNested()
  @Type(() => UserSearchArgType)
  search?: UserSearchArgType;

  @Field(() => UserOrderArgType, { nullable: true })
  @ValidateNested()
  @Type(() => UserOrderArgType)
  order?: UserOrderArgType;

  @Field(() => UserFilterArgType, { nullable: true })
  @ValidateNested()
  @Type(() => UserFilterArgType)
  filter?: UserFilterArgType;
}
