import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ValidateNested } from 'src/class-validator';
import { BookFilterArgType } from 'src/example/dtos';

@ArgsType()
export class BookBulkArgType {
  @Field(() => BookFilterArgType, { nullable: true })
  @ValidateNested()
  @Type(() => BookFilterArgType)
  filter?: BookFilterArgType;
}
