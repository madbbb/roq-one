import { BadRequestException } from '@nestjs/common';
import { prepareError } from '@roq/core';
import { ErrorCodeEnum } from 'src/library/enums';

interface VariablesInterface {
  details: string;
}

interface UserInvalidCurrentPasswordInterface {
  message?: string;
  variables?: VariablesInterface;
}

const defaultMessage = 'Invalid current password';

export class UserInvalidCurrentPasswordException extends BadRequestException {
  constructor(error?: UserInvalidCurrentPasswordInterface, description?: string) {
    super(prepareError(defaultMessage, ErrorCodeEnum.USER_INVALID_CURRENT_PASSWORD, error), description);
  }
}
