import { Field, InputType } from '@nestjs/graphql';
import { ValidateNested } from '@roq/class-validator';
import { BaseFilterArgType, DateFilterArgType, IdFilterArgType, StringFilterArgType } from '@roq/core';
import { Type } from 'class-transformer';

@InputType()
export class UserLoginHistoryFilterArgType extends BaseFilterArgType {
  @Field(() => StringFilterArgType, { nullable: true })
  @ValidateNested()
  @Type(() => StringFilterArgType)
  ip?: StringFilterArgType;
  @Field(() => StringFilterArgType, { nullable: true })
  @ValidateNested()
  @Type(() => StringFilterArgType)
  host?: StringFilterArgType;
  @Field(() => DateFilterArgType, { nullable: true })
  @ValidateNested()
  @Type(() => DateFilterArgType)
  timestamp?: DateFilterArgType;

  @Field(() => IdFilterArgType, { nullable: true })
  @ValidateNested()
  @Type(() => IdFilterArgType)
  userId?: IdFilterArgType;
}
