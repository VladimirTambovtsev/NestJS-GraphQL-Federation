import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Restaurant } from './restaurant.entity';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class User {
  @Field((type) => ID)
  @Directive('@external')
  id: string;

  // @Field((type) => [Restaurant])
  // restaurants?: Restaurant[];
}

// import { Restaurant } from './restaurant.entity';
// import { Directive, ObjectType, Field, ID } from '@nestjs/graphql';

// @ObjectType()
// @Directive('@extends')
// @Directive('@key(fields: "id")')
// export class User {
//   @Field((type) => ID)
//   @Directive('@external')
//   id: string;

//   // @Field((type) => ID)
//   // @Directive('@external')
//   // userId: string;

//   @Field((type) => [Restaurant], { nullable: true })
//   restaurants?: Restaurant[];
// }
