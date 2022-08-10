import { Field, Int, ObjectType } from '@nestjs/graphql';
import { NotificationTypeCategoryModel } from 'src/platformClient/models';

@ObjectType()
export class NotificationTypeCategoryPageModel {
  @Field(() => Int)
  totalCount: number;

  @Field(() => [NotificationTypeCategoryModel])
  data: NotificationTypeCategoryModel[];
}
