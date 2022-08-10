import { Field, ID, ObjectType } from '@nestjs/graphql';
import { FileStatusEnum, JsonObject } from '@roq/core';
import { Type } from 'class-transformer';

@ObjectType()
export class UserFileModel {
  @Field(() => ID)
  id: string;

  @Field(() => FileStatusEnum, { nullable: true })
  status: FileStatusEnum;

  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => JsonObject, { nullable: true })
  customMetaData: Record<string, unknown>;

  @Field(() => String, { nullable: true })
  contentType: string;

  @Field({ nullable: true })
  @Type(() => Date)
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  @Type(() => Date)
  updatedAt?: Date;

  @Field(() => String, { nullable: true })
  url?: string;

  @Field(() => String, { nullable: true })
  uploadUrl?: string;

  @Field(() => Boolean, { nullable: true })
  isPublic: boolean;
}
