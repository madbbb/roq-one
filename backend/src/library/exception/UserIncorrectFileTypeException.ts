import { BadRequestException } from '@nestjs/common';
import { prepareError } from '@roq/core';
import { ErrorCodeEnum } from 'src/library/enums';

interface VariablesInterface {
  details: string;
}

interface UserIncorrectFileTypeExceptionInterface {
  message?: string;
  variables?: VariablesInterface;
}

const defaultMessage = 'Incorrect file type';

export class UserIncorrectFileTypeException extends BadRequestException {
  constructor(error?: UserIncorrectFileTypeExceptionInterface, description?: string) {
    super(prepareError(defaultMessage, ErrorCodeEnum.USER_INCORRECT_FILE_TYPE, error), description);
  }
}
