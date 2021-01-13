import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class newUserInput {
  @Field()
  username: string;

  @Field()
  password: string;
}
