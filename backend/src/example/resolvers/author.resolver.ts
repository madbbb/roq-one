import { NotFoundException } from '@nestjs/common';
import {
  Args,
  ID,
  Info,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Loader } from '@roq/nestjs-dataloader';
import { plainToClass } from 'class-transformer';
import * as DataLoader from 'dataloader';
import { GraphQLResolveInfo } from 'graphql';
import {
  AuthorArgType,
  AuthorBulkArgType,
  AuthorCreateDto,
  AuthorUpdateDto,
  BookArgType,
} from 'src/example/dtos';
import { BookEntity } from 'src/example/entities';
import { BookFindQueryInterface } from 'src/example/interfaces';
import { AuthorBookLoader } from 'src/example/loaders';
import {
  AuthorModel,
  AuthorPageModel,
  BookModel,
  BookPageModel,
} from 'src/example/models';
import { AuthorRepository } from 'src/example/repositories';
import { AuthorService } from 'src/example/services';
import { ArrayLoaderResponseInterface } from 'src/library/interfaces';
import { ParseUUIDStringPipe } from 'src/library/pipes';
import { UtilityService } from 'src/library/services';

@Resolver(() => AuthorModel)
export class AuthorResolver {
  constructor(
    @InjectRepository(AuthorRepository)
    private readonly authorRepository: AuthorRepository,
    private readonly authorService: AuthorService,
    private readonly utilityService: UtilityService
  ) {}

  @Query(() => AuthorModel)
  async author(
    @Args({ name: 'id', type: () => ID }, ParseUUIDStringPipe) id: string,

    @Info() info: GraphQLResolveInfo
  ): Promise<AuthorModel> {
    const fields = this.utilityService.getInfoFields(info);
    const authorEntity = await this.authorService.findById(id, {
      fields,
    });

    if (!authorEntity) {
      throw new NotFoundException(`Author with id ${id} not found`);
    }

    return plainToClass(AuthorModel, authorEntity);
  }

  @Query(() => AuthorPageModel)
  async authors(
    @Args({ type: () => AuthorArgType }) args: AuthorArgType,

    @Info() info: GraphQLResolveInfo
  ): Promise<AuthorPageModel> {
    const fields = this.utilityService.getInfoFields(info);
    const [authorEntities, totalCount] = await this.authorService.findAndCount({
      ...args,
      fields,
    });
    return {
      totalCount,
      data: authorEntities.map((authorEntity) => plainToClass(AuthorModel, authorEntity)),
    };
  }

  @Mutation(() => AuthorModel)
  async createAuthor(
    @Args({ name: 'author', type: () => AuthorCreateDto })
    authorData: AuthorCreateDto
  ): Promise<AuthorModel> {
    const authorEntity = await this.authorService.create(authorData);
    return plainToClass(AuthorModel, authorEntity);
  }

  @Mutation(() => AuthorModel)
  async updateAuthor(
    @Args({ name: 'id', type: () => ID }, ParseUUIDStringPipe) id: string,
    @Args({ name: 'author', type: () => AuthorUpdateDto })
    authorData: AuthorUpdateDto
  ): Promise<AuthorModel> {
    const authorEntity = await this.authorService.update(id, authorData);
    return plainToClass(AuthorModel, authorEntity);
  }

  @Mutation(() => ID)
  async deleteAuthor(
    @Args({ name: 'id', type: () => ID }, ParseUUIDStringPipe) id: string
  ): Promise<string> {
    return this.authorService.deleteById(id);
  }

  @Mutation(() => [ID])
  async deleteAuthors(
    @Args({ type: () => AuthorBulkArgType }) args: AuthorBulkArgType
  ): Promise<string[]> {
    return this.authorService.deleteByIds(args);
  }

  /**
   * One-to-Many Relation. An author has many books.
   */
  @ResolveField(() => BookPageModel)
  async books(
    @Args({ type: () => BookArgType }) args: BookArgType,
    @Parent() authorModel: AuthorModel,
    @Loader(AuthorBookLoader)
    authorBookLoader: DataLoader<BookFindQueryInterface, ArrayLoaderResponseInterface<BookEntity>>,
    @Info() info: GraphQLResolveInfo
  ): Promise<BookPageModel> {
    const fields = this.utilityService.getInfoFields(info);
    const bookEntities = await authorBookLoader.load({
      ...args,
      fields,
      filter: { authorId: { equalTo: authorModel.id } },
    });
    return {
      totalCount: bookEntities.count,
      data: bookEntities.data.map((book) => plainToClass(BookModel, book)),
    };
  }
}
