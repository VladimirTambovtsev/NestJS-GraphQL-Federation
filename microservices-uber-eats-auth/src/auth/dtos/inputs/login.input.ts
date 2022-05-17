import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

@InputType()
export class LoginInput {
  @ApiProperty({ example: 'test@test.com', description: 'User email' })
  @Field()
  @IsNotEmpty()
  @IsEmail({ message: 'Email is not valid' })
  email: string;

  @ApiProperty({ example: 'MySecurePassword', description: 'User password' })
  @Field()
  @IsNotEmpty()
  @IsString({ message: 'Password must be a string' })
  @Length(8, 32, {
    message: 'Password must be more than 8 and less than 32 characters',
  })
  password: string;
}
