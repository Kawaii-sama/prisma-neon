import { Args, Query, Resolver } from '@nestjs/graphql';
import { BookService } from './book.service';
import { Book } from './model/book.model';

@Resolver( () => Book)
export class BookResolver {
    constructor (private readonly bookService : BookService) {}

    @Query( () => [Book])
    getAllBooks() {
        return this.bookService.findAll();
    }

    @Query( () => Book)
    getBook(@Args('id') id : string) {
        return this.bookService.findOne(id);
    }

}
