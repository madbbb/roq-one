import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsEnum } from '@roq/class-validator';
import { OrderEnum } from '@roq/core';
import { BookOrderSortEnum } from 'src/example/enums';

@InputType()
export class BookOrderArgType {
  @Field(() => OrderEnum)
  @IsDefined()
  @IsEnum(OrderEnum)
  order: OrderEnum;

  @Field(() => BookOrderSortEnum)
  @IsDefined()
  @IsEnum(BookOrderSortEnum)
  sort: BookOrderSortEnum;
}
