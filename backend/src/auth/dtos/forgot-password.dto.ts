import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsEmail, IsString } from '@roq/class-validator';
import { Trim } from '@roq/core';

@InputType()
export class ForgotPasswordDto {
  @Field()
  @IsEmail()
  @Trim()
  @IsDefined()
  @IsString()
  email: string;
}
