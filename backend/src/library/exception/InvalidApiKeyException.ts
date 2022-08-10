import { UnauthorizedException } from '@nestjs/common';
import { prepareError } from '@roq/core';
import { ErrorCodeEnum } from 'src/library/enums';

interface VariablesInterface {
  details: string;
}

interface InvalidApiKeyExceptionInterface {
  message?: string;
  variables?: VariablesInterface;
}

const defaultMessage = 'Invalid api key';

export class InvalidApiKeyException extends UnauthorizedException {
  constructor(error?: InvalidApiKeyExceptionInterface, description?: string) {
    super(prepareError(defaultMessage, ErrorCodeEnum.INVALID_API_KEY, error), description);
  }
}
