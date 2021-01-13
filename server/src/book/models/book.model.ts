import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Book {
  @Field((type) => Int)
  id: number;
  @Field((type) => String, { nullable: false })
  bookName: string;
  @Field((type) => String, { nullable: false, description: '作者' })
  authorName: string;
}
