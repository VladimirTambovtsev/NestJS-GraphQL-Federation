import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { ObjectType, Field, Int, ID, Directive } from '@nestjs/graphql';
import { v4 } from 'uuid';
import { User } from './user.entity';

@ObjectType()
@Directive('@key(fields: "id")')
@Entity({ tableName: 'restaurants' })
export class Restaurant {
  @Field((type) => ID)
  @PrimaryKey()
  id = v4();

  // @Field()
  // userId: string;

  // @ManyToOne() // plain decorator is enough, type will be sniffer via reflection!
  // @Property()
  // user?: User;

  @Field(() => Int, { description: 'Example field (placeholder)' })
  @Property()
  exampleField: number;
}
