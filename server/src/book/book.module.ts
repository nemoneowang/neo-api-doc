import { BookResolver } from './book.resolver';
import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';

@Module({
  providers: [BookService, BookResolver],
  controllers: [BookController],
})
export class BookModule {}
