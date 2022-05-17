import {
  Resolver,
  Query,
  Args,
  Mutation,
  ResolveReference,
  ID,
} from '@nestjs/graphql';
import { CreateUserInput } from './dto/input/create-user.input';
import { DeleteUserInput } from './dto/input/delete-user.input';
import { UpdateUserInput } from './dto/input/update-user.input';
import { User } from './user';

import { UsersService } from './users.service';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { UserOutput } from './dto/output/user.output';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  // TODO: add JSDoc everywhere

  // TODO: add me() query

  // TODO: add forgotPassword, resetPassword mutations

  // @Query(() => UserOutput, { name: 'user', nullable: true })
  // @UseGuards(GqlAuthGuard)
  // getUser(@CurrentUser() user: User, @Args() getUserArgs: GetUserArgs): User {
  //   return this.usersService.getUser(getUserArgs);
  // }

  // TODO: add comments documentation to playground

  @Query((returns) => User)
  async user(@Args({ name: 'id', type: () => ID }) id: string): Promise<User> {
    return await this.usersService.getUserById(id);
  }

  @Query(() => [UserOutput], { name: 'users', nullable: 'items' })
  // @UseGuards(GqlAuthGuard)
  async users() {
    return await this.usersService.getUsers();
  }

  @Mutation(() => UserOutput)
  createUser(
    @Args('createUserData') createUserData: CreateUserInput,
  ): UserOutput {
    return this.usersService.createUser(createUserData);
  }

  @Mutation(() => UserOutput)
  deleteUser(
    @Args('deleteUserData') deleteUserData: DeleteUserInput,
  ): UserOutput {
    return this.usersService.deleteUser(deleteUserData);
  }

  __resolveReference(user, { fetchUserById }) {
    return fetchUserById(user.id);
  }

  // @ResolveReference()
  // resolvereferance(ref: { __typename: string; id: string }) {
  //   return this.usersService.getUserById(ref.id);
  // }
}
