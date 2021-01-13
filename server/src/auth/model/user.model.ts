import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field((type) => Int)
  userId: number;
  @Field((type) => String, { nullable: false })
  username: string;
  @Field((type) => String, { nullable: false })
  password: string;
}
