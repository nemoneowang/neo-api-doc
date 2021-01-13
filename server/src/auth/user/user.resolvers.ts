import { GqlAuthGuard } from './../guards/gql.guard';
import { ValidatorUser } from './../model/validatorUser.model';
import { AuthService } from './../auth/auth.service';
import { Args, Int, Resolver, Query, Mutation } from '@nestjs/graphql';
import { newUserInput } from '../dto/new-user.input';
import { updateUserInput } from '../dto/update-user.input';
import { User } from '../model/user.model';
import { UserService } from './user.service';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from './../decorator/user.decorator';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService, private readonly authService: AuthService) {}
  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  async user(@CurrentUser() user: User, @Args({ name: 'userId', type: () => Int }) userId: number): Promise<User> {
    return await this.userService.getUserById(userId);
  }
  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  async whoAm(@CurrentUser() user: User): Promise<User> {
    return await this.userService.getUserById(user.userId);
  }

  @Query(() => ValidatorUser)
  async login(@Args({ name: 'username', type: () => String }) username: string, @Args({ name: 'password', type: () => String }) password: string): Promise<ValidatorUser> {
    return await this.authService.validateUser(username, password);
  }

  @Mutation(() => User)
  async createUser(@Args({ name: 'user', type: () => newUserInput }) user: newUserInput): Promise<User> {
    return await this.userService.create(user);
  }

  @Mutation(() => User)
  async deleteUser(@Args({ name: 'id', type: () => Int }) id: number): Promise<User> {
    const user = await this.userService.getUserById(id);
    if (user === undefined) {
      throw new Error('id错误');
    }
    return this.userService.deleteUser(user);
  }

  @Mutation(() => User)
  async updateUser(@Args({ name: 'user', type: () => updateUserInput }) user: updateUserInput): Promise<User> {
    const temp = await this.userService.getUserById(user.id);
    if (temp === undefined) {
      throw new Error('id错误');
    }
    temp.password = user.password;
    temp.username = user.username;
    return this.userService.updateUser(temp);
  }
}
