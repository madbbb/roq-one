import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseMultipleEntityLoader, BaseSingleEntityLoader, DataLoaderInterceptor, LibraryModule, PlatformSpaceClientModule } from '@roq/core';
import { AuthModule } from 'src/auth';
import { AuthorEntity, BookEntity } from 'src/example/entities';
import { BookFileLoader } from 'src/example/loaders';
import { AuthorRepository, BookRepository } from 'src/example/repositories';
import { AuthorResolver, BookResolver } from 'src/example/resolvers';
import { AuthorService, BookService } from 'src/example/services';
@Module({
  imports: [
    TypeOrmModule.forFeature([AuthorEntity, AuthorRepository, BookEntity, BookRepository]),
    LibraryModule,
    AuthModule,
    PlatformSpaceClientModule,
  ],
  providers: [
    AuthorService,
    AuthorResolver,
    BookService,
    BookResolver,
    BookFileLoader,
    // UtilityService,
    {
      provide: APP_INTERCEPTOR,
      useClass: DataLoaderInterceptor,
    },
    BaseSingleEntityLoader,
    BaseMultipleEntityLoader,
  ],
  exports: [TypeOrmModule, AuthorService, BookService],
  controllers: [],
})
export class ExampleModule {}
