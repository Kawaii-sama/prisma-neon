import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookInput } from './dto/create-book.input';

@Injectable()
export class BookService {
    constructor(private prisma: PrismaService) {}

    create(data : CreateBookInput) {
        return this.prisma.book.create({ data });
    }

    /*
    1. data would get value from input
    2. graphQl through resolver would give the value to method
    3. method would forward to prisma.
    4. prisma would create the record.
    */

    findAll() {
        return this.prisma.book.findMany();
    }

    findOne(id: string) {
        return this.prisma.book.findUnique({where :  { id }});
    }
}
