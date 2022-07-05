import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsEnum } from 'src/class-validator';
import { OrderEnum } from 'src/library/enums';
import { UserOrderSortEnum } from 'src/user/enums';

@InputType()
export class UserOrderArgType {
  @Field(() => OrderEnum)
  @IsDefined()
  @IsEnum(OrderEnum)
  order: OrderEnum;

  @Field(() => UserOrderSortEnum)
  @IsDefined()
  @IsEnum(UserOrderSortEnum)
  sort: UserOrderSortEnum;
}
