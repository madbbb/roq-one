import { Field, Int, ObjectType } from '@nestjs/graphql';
import { NotificationTypeChannelMailModel } from 'src/platformClient/models';

@ObjectType()
export class NotificationTypeChannelMailPageModel {
  @Field(() => Int)
  totalCount: number;

  @Field(() => [NotificationTypeChannelMailModel])
  data: NotificationTypeChannelMailModel[];
}
