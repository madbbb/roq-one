import { Field, Int, ObjectType } from '@nestjs/graphql';
import { NotificationWebModel } from 'src/platformClient/models';

@ObjectType()
export class NotificationWebPageModel {
  @Field(() => Int)
  totalCount: number;

  @Field(() => [NotificationWebModel])
  data: NotificationWebModel[];
}
