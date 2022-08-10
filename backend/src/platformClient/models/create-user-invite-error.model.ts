import { Field, ObjectType } from '@nestjs/graphql';
import { Trim } from '@roq/core';

@ObjectType()
export class CreateUserInviteErrorModel {
  @Field(() => String)
  @Trim()
  firstName?: string;

  @Field(() => String)
  @Trim()
  lastName?: string;

  @Field(() => String)
  @Trim()
  email: string;

  @Field(() => String)
  error: string;
}
