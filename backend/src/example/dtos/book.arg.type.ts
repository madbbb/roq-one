import { ArgsType, Field } from '@nestjs/graphql';
import { ValidateNested } from '@roq/class-validator';
import { BaseArgType } from '@roq/core';
import { Type } from 'class-transformer';
import {
  BookFilterArgType,
  BookOrderArgType,
  BookSearchArgType,
} from 'src/example/dtos';

@ArgsType()
export class BookArgType extends BaseArgType {
  @Field(() => BookSearchArgType, { nullable: true })
  @ValidateNested()
  @Type(() => BookSearchArgType)
  search?: BookSearchArgType;

  @Field(() => BookOrderArgType, { nullable: true })
  @ValidateNested()
  @Type(() => BookOrderArgType)
  order?: BookOrderArgType;

  @Field(() => BookFilterArgType, { nullable: true })
  @ValidateNested()
  @Type(() => BookFilterArgType)
  filter?: BookFilterArgType;
}
