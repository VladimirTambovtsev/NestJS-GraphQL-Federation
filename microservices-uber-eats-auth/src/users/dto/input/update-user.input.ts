import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Field()
  @IsNotEmpty()
  id: string;

  @Field()
  @IsOptional()
  @IsNotEmpty()
  age?: number;

  // @Field({ nullable: true })
  // @IsOptional()
  // isSubscribed?: boolean;
}
