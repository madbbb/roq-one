import { BadRequestException } from '@nestjs/common';
import { prepareError } from '@roq/core';
import { ErrorCodeEnum } from 'src/library/enums';

interface VariablesInterface {
  details: string;
}

interface UserIncorrectEmailPasswordExceptionInterface {
  message?: string;
  variables?: VariablesInterface;
}

const defaultMessage = 'The email/password you entered are not correct';

export class UserIncorrectEmailPasswordException extends BadRequestException {
  constructor(error?: UserIncorrectEmailPasswordExceptionInterface, description?: string) {
    super(prepareError(defaultMessage, ErrorCodeEnum.USER_INCORRECT_EMAIL_PASSWORD, error), description);
  }
}
