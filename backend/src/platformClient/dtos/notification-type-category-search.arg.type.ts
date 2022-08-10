import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsEnum } from '@roq/class-validator';
import { NotificationTypeCategorySearchKeyEnum } from '@roq/core';

@InputType()
export class NotificationTypeCategorySearchArgType {
  @Field(() => NotificationTypeCategorySearchKeyEnum)
  @IsDefined()
  @IsEnum(NotificationTypeCategorySearchKeyEnum)
  key: NotificationTypeCategorySearchKeyEnum;

  @Field()
  value: string;
}
