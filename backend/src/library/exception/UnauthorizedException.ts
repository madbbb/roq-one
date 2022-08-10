import { UnauthorizedException as _UnauthorizedException } from '@nestjs/common';
import { prepareError } from '@roq/core';
import { ErrorCodeEnum } from 'src/library/enums';

interface VariablesInterface {
  message: string | Record<string, unknown> | unknown;
}

interface UnauthorizedExceptionInterface {
  message?: string;
  variables: VariablesInterface;
}

const defaultMessage = '{{message}}';

export class UnauthorizedException extends _UnauthorizedException {
  constructor(error: UnauthorizedExceptionInterface, description?: string) {
    super(prepareError(defaultMessage, ErrorCodeEnum.UNAUTHORIZED_EXCEPTION, error), description);
  }
}
