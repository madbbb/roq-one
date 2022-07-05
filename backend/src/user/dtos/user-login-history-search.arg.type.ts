import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsEnum } from 'src/class-validator';
import { UserLoginHistorySearchKeyEnum } from 'src/user/enums';

@InputType()
export class UserLoginHistorySearchArgType {
  @Field(() => UserLoginHistorySearchKeyEnum)
  @IsDefined()
  @IsEnum(UserLoginHistorySearchKeyEnum)
  key: UserLoginHistorySearchKeyEnum;

  @Field()
  value: string;
}
