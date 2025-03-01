import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, ID, Info, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Loader, ParseUUIDStringPipe, PlatformSpaceClientService, SingleLoader, UtilityService } from '@roq/core';
import { plainToClass } from 'class-transformer';
import * as DataLoader from 'dataloader';
import { GraphQLResolveInfo } from 'graphql';
import { JwtAuthGuard } from 'src/auth/guards';
import { BOOK_FILE_CATEGORY } from 'src/example/constants';
import { BookArgType, BookBulkArgType, BookCreateDto, BookFileCreateDto, BookUpdateDto } from 'src/example/dtos';
import { AuthorEntity } from 'src/example/entities';
import { AuthorFindQueryInterface, BookFileFindQueryInterface } from 'src/example/interfaces';
import { BookFileLoader } from 'src/example/loaders';
import { AuthorModel, BookFileModel, BookModel, BookPageModel } from 'src/example/models';
import { AuthorRepository } from 'src/example/repositories';
import { BookService } from 'src/example/services';

@Resolver(() => BookModel)
export class BookResolver {
  constructor(
    private readonly bookService: BookService,
    private readonly utilityService: UtilityService,
    private readonly platformSpaceClientService: PlatformSpaceClientService,
  ) {}

  @Query(() => BookModel)
  async book(
    @Args({ name: 'id', type: () => ID }, ParseUUIDStringPipe) id: string,

    @Info() info: GraphQLResolveInfo,
  ): Promise<BookModel> {
    const fields = this.utilityService.getInfoFields(info);
    const bookEntity = await this.bookService.findById(id, {
      fields,
    });

    if (!bookEntity) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }

    return plainToClass(BookModel, bookEntity);
  }

  @Query(() => BookPageModel)
  async books(
    @Args({ type: () => BookArgType }) args: BookArgType,

    @Info() info: GraphQLResolveInfo,
  ): Promise<BookPageModel> {
    const fields = this.utilityService.getInfoFields(info);
    const [bookEntities, totalCount] = await this.bookService.findAndCount({
      ...args,
      fields,
    });
    return {
      totalCount,
      data: bookEntities.map((bookEntity) => plainToClass(BookModel, bookEntity)),
    };
  }

  @Mutation(() => BookModel)
  async createBook(
    @Args({ name: 'book', type: () => BookCreateDto })
    bookData: BookCreateDto,
  ): Promise<BookModel> {
    const bookEntity = await this.bookService.create(bookData);
    return plainToClass(BookModel, bookEntity);
  }

  @Mutation(() => BookModel)
  async updateBook(
    @Args({ name: 'id', type: () => ID }, ParseUUIDStringPipe) id: string,
    @Args({ name: 'book', type: () => BookUpdateDto }) bookData: BookUpdateDto,
  ): Promise<BookModel> {
    const bookEntity = await this.bookService.update(id, bookData);
    return plainToClass(BookModel, bookEntity);
  }

  @Mutation(() => ID)
  async deleteBook(@Args({ name: 'id', type: () => ID }, ParseUUIDStringPipe) id: string): Promise<string> {
    return this.bookService.deleteById(id);
  }

  @Mutation(() => [ID])
  async deleteBooks(@Args({ type: () => BookBulkArgType }) args: BookBulkArgType): Promise<string[]> {
    return this.bookService.deleteByIds(args);
  }

  @Mutation(() => BookFileModel)
  @UseGuards(JwtAuthGuard)
  async saveBookFile(
    @Args({
      name: 'data',
      type: () => BookFileCreateDto,
    })
    data: BookFileCreateDto,
  ): Promise<BookFileModel> {
    const file = await this.platformSpaceClientService.createFile({
      ...data,
      fileCategory: BOOK_FILE_CATEGORY,
    });
    return plainToClass(BookFileModel, file);
  }

  /**
   * Many-to-One Relation. There is book  in one author.
   */
  @ResolveField(() => AuthorModel)
  async author(
    @Parent() bookModel: BookModel,
    @SingleLoader(AuthorRepository)
    authorLoader: DataLoader<AuthorFindQueryInterface, AuthorEntity>,
    @Info() info: GraphQLResolveInfo,
  ): Promise<AuthorModel> {
    const fields = this.utilityService.getInfoFields(info);
    const authorEntity = await authorLoader.load({
      filter: { id: { equalTo: bookModel.authorId } },
      fields,
    });
    return plainToClass(AuthorModel, authorEntity);
  }

  @ResolveField(() => [BookFileModel])
  async bookFiles(
    @Parent() book: BookModel,
    @Loader(BookFileLoader)
    bookFileLoader: DataLoader<BookFileFindQueryInterface, BookFileModel[]>,
  ): Promise<BookFileModel[]> {
    const bookFiles = await bookFileLoader.load({
      id: book.id,
    });
    return bookFiles.map((file) => plainToClass(BookFileModel, file));
  }
}
