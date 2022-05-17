import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { User } from 'src/users/user';

@InputType()
export class CreateUserInput extends User {
  @Field()
  @IsNotEmpty()
  @IsEmail({ message: 'Email is not valid' })
  email: string;

  @Field()
  @IsNotEmpty()
  @IsString({ message: 'Password must be a string' })
  @Length(8, 32, {
    message: 'Password must be more than 8 and less than 32 characters',
  })
  password: string;

  @Field()
  age?: number;
}
