import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsDefined, IsEmail, IsOptional, IsString } from '@roq/class-validator';
import { Trim } from '@roq/core';

@InputType()
export class LoginDto {
  @Field()
  @IsEmail()
  @Trim()
  @IsDefined()
  @IsString()
  email: string;

  @Field()
  @IsDefined()
  @IsString()
  password: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  keepMeLoggedIn?: boolean;
}
