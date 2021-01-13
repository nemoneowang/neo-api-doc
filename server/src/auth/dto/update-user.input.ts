import { newUserInput } from './new-user.input';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class updateUserInput extends newUserInput {
  @Field()
  id: number;
}
