import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsEnum } from '@roq/class-validator';
import { OrderEnum } from '@roq/core';
import { AuthorOrderSortEnum } from 'src/example/enums';

@InputType()
export class AuthorOrderArgType {
  @Field(() => OrderEnum)
  @IsDefined()
  @IsEnum(OrderEnum)
  order: OrderEnum;

  @Field(() => AuthorOrderSortEnum)
  @IsDefined()
  @IsEnum(AuthorOrderSortEnum)
  sort: AuthorOrderSortEnum;
}
