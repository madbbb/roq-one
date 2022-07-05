import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ValidateNested } from 'src/class-validator';
import { BaseFilterArgType, DateFilterArgType, IdFilterArgType, StringFilterArgType } from 'src/library/argTypes';

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
