import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from 'src/example/entities';
import { BookRepository } from 'src/example/repositories';
import { BaseSingleEntityLoader } from 'src/library/loaders';

@Injectable({ scope: Scope.REQUEST })
export class BookLoader extends BaseSingleEntityLoader<BookEntity> {
  constructor(
    @InjectRepository(BookRepository)
    private readonly bookRepository: BookRepository,
  ) {
    super(bookRepository);
  }
}
