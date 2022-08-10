import { Field, Int, ObjectType } from '@nestjs/graphql';
import { NotificationTypeUserPreferenceModel } from 'src/platformClient/models';

@ObjectType()
export class NotificationTypeUserPreferencePageModel {
  @Field(() => Int)
  totalCount: number;

  @Field(() => [NotificationTypeUserPreferenceModel])
  data: NotificationTypeUserPreferenceModel[];
}
