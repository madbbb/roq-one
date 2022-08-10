import { Field, Int, ObjectType } from '@nestjs/graphql';
import { NotificationTypeModel } from 'src/platformClient/models';

@ObjectType()
export class NotificationTypePageModel {
  @Field(() => Int)
  totalCount: number;

  @Field(() => [NotificationTypeModel])
  data: NotificationTypeModel[];
}
