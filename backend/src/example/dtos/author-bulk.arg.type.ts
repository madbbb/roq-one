import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ValidateNested } from 'src/class-validator';
import { AuthorFilterArgType } from 'src/example/dtos';

@ArgsType()
export class AuthorBulkArgType {
  @Field(() => AuthorFilterArgType, { nullable: true })
  @ValidateNested()
  @Type(() => AuthorFilterArgType)
  filter?: AuthorFilterArgType;
}
