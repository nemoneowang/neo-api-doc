import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Role } from './role.model';

@ObjectType()
export class User {
  @Field((type) => Int)
  userId: number;
  @Field((type) => String, { nullable: false })
  username: string;
  @Field((type) => String, { nullable: false })
  password: string;

  @Field((type) => [Role], { nullable: true })
  roleList: Role[];
}
