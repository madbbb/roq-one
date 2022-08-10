import { Field, ObjectType } from '@nestjs/graphql';
import { NotificationWebModel } from 'src/platformClient/models';

@ObjectType()
export class NotificationModel {
  @Field(() => [NotificationWebModel], { nullable: true })
  webNotifications: NotificationWebModel[];
}
