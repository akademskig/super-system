import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignInInput } from './dto/signIn.input';
import { RegisterInput } from './dto/register.input';
import { Auth } from './entities/auth.entity';
import { UseGuards } from '@nestjs/common';
import { GQLCustomGuard } from 'src/guards/GQLCustomGuard';
import { User } from 'src/users/entities/user.entity';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(GQLCustomGuard)
  @Mutation(() => Auth)
  async signIn(@Args('signInInput') signInInput: SignInInput) {
    const res = await this.authService.signIn(signInInput);
    return res;
  }
  @Mutation(() => User)
  register(@Args('registerInput') registerInput: RegisterInput) {
    return this.authService.register(registerInput);
  }
}
