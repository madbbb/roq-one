import { UnauthorizedException } from '@nestjs/common';
import { prepareError } from '@roq/core';
import { ErrorCodeEnum } from 'src/library/enums';

interface VariablesInterface {
  details: string;
}

interface UserNotConfirmedExceptionInterface {
  message?: string;
  variables?: VariablesInterface;
}

const defaultMessage = 'User is not confirmed';

export class UserNotConfirmedException extends UnauthorizedException {
  constructor(error?: UserNotConfirmedExceptionInterface, description?: string) {
    super(prepareError(defaultMessage, ErrorCodeEnum.USER_NOT_CONFIRMED, error), description);
  }
}
