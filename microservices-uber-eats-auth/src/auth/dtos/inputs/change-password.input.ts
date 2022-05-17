import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

@InputType()
export class ChangePasswordInput {
  @ApiProperty({
    example: '35c8e68b-2cc1-4c97-bf7f-e744150ac0ad',
    description: 'User id',
  })
  @Field()
  @IsString({ message: 'Uesr id must be a string' })
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    example: "ru$z[k6E!e'];9X",
    description: "User's new password",
  })
  @Field()
  @IsNotEmpty()
  @IsString({ message: 'Password must be a string' })
  @Length(8, 32, {
    message: 'Password must be more than 8 and less than 32 characters',
  })
  newPassword: string;
}
