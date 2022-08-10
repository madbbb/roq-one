import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsEnum } from '@roq/class-validator';
import { NotificationTypeCategoryOrderSortEnum, OrderEnum } from '@roq/core';

@InputType()
export class NotificationTypeCategoryOrderArgType {
  @Field(() => OrderEnum)
  @IsDefined()
  @IsEnum(OrderEnum)
  order: OrderEnum;

  @Field(() => NotificationTypeCategoryOrderSortEnum)
  @IsDefined()
  @IsEnum(NotificationTypeCategoryOrderSortEnum)
  sort: NotificationTypeCategoryOrderSortEnum;
}
