import { Field, Int, ObjectType, ID, Directive } from '@nestjs/graphql';
import { classToPlain, Exclude } from 'class-transformer';

// TODO: add entity here
@ObjectType()
@Directive('@key(fields: "id")')
export class User {
  // @Directive('@external')
  @Field(() => ID)
  id: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field({ description: 'Email of the user' })
  email: string;

  // TODO: add OneToOne relation to verifications

  // TODO: set min / max length / regexp
  @Field({ description: 'Password of the user' })
  password?: string;

  @Field(() => Int, { nullable: true, description: 'Age of the user' })
  age?: number;
}
