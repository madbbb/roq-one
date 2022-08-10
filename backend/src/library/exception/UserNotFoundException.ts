import { NotFoundException } from '@nestjs/common';
import { prepareError } from '@roq/core';
import { ErrorCodeEnum } from 'src/library/enums';

interface VariablesInterface {
  id: string;
}

interface UserNotFoundExceptionInterface {
  message?: string;
  variables: VariablesInterface;
}

const defaultMessage = 'User with id {{id}} not found';

export class UserNotFoundException extends NotFoundException {
  constructor(error: UserNotFoundExceptionInterface, description?: string) {
    super(prepareError(defaultMessage, ErrorCodeEnum.USER_NOT_FOUND, error), description);
  }
}
