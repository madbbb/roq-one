import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from 'src/example/entities';
import { BookRepository } from 'src/example/repositories';
import { BaseMultipleEntityLoader } from 'src/library/loaders';

@Injectable({ scope: Scope.REQUEST })
export class AuthorBookLoader extends BaseMultipleEntityLoader<BookEntity> {
  constructor(
    @InjectRepository(BookRepository)
    private readonly bookRepository: BookRepository,
  ) {
    super(bookRepository, 'authorId');
  }
}
