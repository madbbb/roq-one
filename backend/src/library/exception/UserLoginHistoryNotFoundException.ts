import { NotFoundException } from '@nestjs/common';
import { prepareError } from '@roq/core';
import { ErrorCodeEnum } from 'src/library/enums';

interface VariablesInterface {
  id: string;
}

interface UserLoginHistoryNotFoundExceptionInterface {
  message?: string;
  variables: VariablesInterface;
}

const defaultMessage = 'UserLoginHistory with id {{id}} not found';

export class UserLoginHistoryNotFoundException extends NotFoundException {
  constructor(error: UserLoginHistoryNotFoundExceptionInterface, description?: string) {
    super(prepareError(defaultMessage, ErrorCodeEnum.USER_LOGIN_HISTORY_NOT_FOUND, error), description);
  }
}
