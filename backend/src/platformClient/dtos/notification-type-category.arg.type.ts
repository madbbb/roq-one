import { ArgsType, Field } from '@nestjs/graphql';
import { ValidateNested } from '@roq/class-validator';
import { BaseArgType } from '@roq/core';
import { Type } from 'class-transformer';
import {
  NotificationTypeCategoryFilterArgType,
  NotificationTypeCategoryOrderArgType,
  NotificationTypeCategorySearchArgType,
} from 'src/platformClient/dtos';

@ArgsType()
export class NotificationTypeCategoryArgType extends BaseArgType {
  @Field(() => NotificationTypeCategorySearchArgType, { nullable: true })
  @ValidateNested()
  @Type(() => NotificationTypeCategorySearchArgType)
  search?: NotificationTypeCategorySearchArgType;

  @Field(() => NotificationTypeCategoryOrderArgType, { nullable: true })
  @ValidateNested()
  @Type(() => NotificationTypeCategoryOrderArgType)
  order?: NotificationTypeCategoryOrderArgType;

  @Field(() => NotificationTypeCategoryFilterArgType, { nullable: true })
  @ValidateNested()
  @Type(() => NotificationTypeCategoryFilterArgType)
  filter?: NotificationTypeCategoryFilterArgType;
}
