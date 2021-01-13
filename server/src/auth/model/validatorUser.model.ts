import { User } from './user.model';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ValidatorUser extends User {
  @Field((type) => String, { nullable: false })
  token: string;
}
