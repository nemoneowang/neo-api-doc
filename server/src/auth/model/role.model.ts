import { Field, ObjectType, Int } from '@nestjs/graphql';
import { User } from './user.model';

@ObjectType()
export class Role {
  @Field((type) => Int)
  roleId: number;

  @Field((type) => String, { nullable: false })
  roleName: string;

  @Field((type) => [User], { nullable: true })
  userList: User[];
}
