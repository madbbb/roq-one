import { Field, ID, ObjectType } from '@nestjs/graphql';
import { FileStatusEnum, JsonObject } from '@roq/core';
import { Type } from 'class-transformer';

@ObjectType()
export class BookFileModel {
  @Field(() => ID)
  id: string;

  @Field(() => FileStatusEnum, { nullable: false })
  status: FileStatusEnum;

  @Field(() => String, { nullable: false })
  name: string;

  @Field(() => JsonObject, { nullable: false })
  customMetaData: Record<string, unknown>;

  @Field(() => String, { nullable: false })
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

  @Field(() => Boolean, { nullable: false })
  isPublic: boolean;
}
