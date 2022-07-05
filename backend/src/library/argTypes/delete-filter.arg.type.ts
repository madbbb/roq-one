import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ValidateNested } from 'src/class-validator';
import { DeleteArgType } from 'src/library/argTypes';

@InputType()
export class DeleteFilterArgType {
  @Field(() => DeleteArgType, { nullable: true })
  @ValidateNested()
  @Type(() => DeleteArgType)
  id?: DeleteArgType;
}
