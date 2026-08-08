import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BookService } from './book.service';
import { Book } from './model/book.model';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';

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

    @Mutation( () => Book)
    createBook(@Args('input') input : CreateBookInput) {
        return this.bookService.create(input);

    }

    @Mutation( () => Book)
    updateBook (@Args ('input') input: UpdateBookInput) {
        return this.bookService.update(input);
    }

}
