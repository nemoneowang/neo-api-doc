import { Book } from './models/book.model';
import { Args, Int, Resolver, Query } from '@nestjs/graphql';
import { BookService } from './book.service';

@Resolver((of) => Book)
export class BookResolver {
  constructor(private readonly bookService: BookService) {}

  @Query((returns) => Book)
  async book(@Args({ name: 'id', type: () => Int }) id: number): Promise<Book> {
    const book = new Book();
    book.id = id;
    book.bookName = 'book--' + id;
    return book;
  }
}
