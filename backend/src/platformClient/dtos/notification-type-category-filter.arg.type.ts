import { Field, InputType } from '@nestjs/graphql';
import { ValidateNested } from '@roq/class-validator';
import { BaseFilterArgType, IdFilterArgType, StringFilterArgType } from '@roq/core';
import { Type } from 'class-transformer';

@InputType()
export class NotificationTypeCategoryFilterArgType extends BaseFilterArgType {
  @Field(() => StringFilterArgType, { nullable: true })
  @ValidateNested()
  @Type(() => StringFilterArgType)
  key?: StringFilterArgType;

  @Field(() => StringFilterArgType, { nullable: true })
  @ValidateNested()
  @Type(() => StringFilterArgType)
  description?: StringFilterArgType;

  @Field(() => IdFilterArgType, { nullable: true })
  @ValidateNested()
  @Type(() => IdFilterArgType)
  notificationTypeId?: IdFilterArgType;
}
