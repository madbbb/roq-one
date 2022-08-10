import { BadRequestException } from '@nestjs/common';
import { prepareError } from '@roq/core';
import { ErrorCodeEnum } from 'src/library/enums';

interface VariablesInterface {
  details: string;
}

interface UserEmailNotProvidedExceptionInterface {
  message?: string;
  variables?: VariablesInterface;
}

const defaultMessage = 'No email provided';

export class UserEmailNotProvidedException extends BadRequestException {
  constructor(error?: UserEmailNotProvidedExceptionInterface, description?: string) {
    super(prepareError(defaultMessage, ErrorCodeEnum.USER_EMAIL_NOT_PROVIDED, error), description);
  }
}
