import { AuthService } from './auth.service';
import { Resolver, Args, Mutation, ResolveReference } from '@nestjs/graphql';

import { Auth } from './auth.type';
import { LoginInput } from './dtos/inputs/login.input';
import { AuthToken } from './dtos/outputs/token.output';
import { User } from 'src/users/user';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthToken)
  login(@Args('login') loginInput: LoginInput) {
    return this.authService.login(loginInput);
  }

  @Mutation(() => AuthToken)
  registration(@Args('registration') registration: LoginInput) {
    return this.authService.registration(registration as User);
  }
}
