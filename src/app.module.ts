import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { BookModule } from './book/book.module';
import { ThrottlerGuard, ThrottlerModule, seconds} from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
    }),
    PrismaModule,
    BookModule,
    ThrottlerModule.forRoot({
      throttlers : [
        {
          name : 'default',
          ttl : seconds(60),
          limit : 3,
        }
      ],
      errorMessage : 'Too many requests! Please wait and retry',
    })
  ],
  controllers: [AppController],
  providers: [AppService , {
    provide : APP_GUARD,
    useClass : ThrottlerGuard
  }],
})
export class AppModule {}
