import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsEnum } from 'src/class-validator';
import { OrderEnum } from 'src/library/enums';
import { UserLoginHistoryOrderSortEnum } from 'src/user/enums';

@InputType()
export class UserLoginHistoryOrderArgType {
  @Field(() => OrderEnum)
  @IsDefined()
  @IsEnum(OrderEnum)
  order: OrderEnum;

  @Field(() => UserLoginHistoryOrderSortEnum)
  @IsDefined()
  @IsEnum(UserLoginHistoryOrderSortEnum)
  sort: UserLoginHistoryOrderSortEnum;
}
