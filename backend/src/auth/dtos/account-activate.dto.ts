import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsString } from 'src/class-validator';

@InputType()
export class AccountActivateDto {
  @Field()
  @IsDefined()
  @IsString()
  token: string;
}
