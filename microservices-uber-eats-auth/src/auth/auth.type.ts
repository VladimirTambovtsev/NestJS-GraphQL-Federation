import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@ObjectType()
export class Auth {
  @Field()
  @ApiProperty({ example: 'test@test.com', description: 'User email' })
  email: string;

  @Field()
  @ApiProperty({ example: 'MySecurePassword', description: 'User password' })
  password: string;
}
