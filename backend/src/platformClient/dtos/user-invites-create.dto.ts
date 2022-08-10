import { Field, InputType } from '@nestjs/graphql';
import { IsArray, ValidateNested } from '@roq/class-validator';
import { Type } from 'class-transformer';
import { UserInviteCreateDto } from 'src/platformClient/dtos';

@InputType()
export class UserInvitesCreateDto {
  @Field(() => [UserInviteCreateDto], { nullable: false })
  @Type(() => UserInviteCreateDto)
  @IsArray()
  @ValidateNested({ each: true })
  userInvites: UserInviteCreateDto[];
}
