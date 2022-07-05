import { applyDecorators } from '@nestjs/common';
import {
  buildMessage,
  IsFirebasePushId as _IsFirebasePushId,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';

/**
 * Checks if the string is a Firebase Push Id
 * If given value is not a Firebase Push Id, it returns false
 */
export const IsFirebasePushId = (validationOptions?: ValidationOptions) =>
  applyDecorators(
    _IsFirebasePushId({
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.IS_FIREBASE_PUSH_ID,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} ${arg.property} must be a Firebase Push Id`;
          }, validationOptions)(),
          variables: {
            property: arg.property,
            values: arg.value,
            isValidationError: true,
            constraints: arg.constraints,
            each: validationOptions?.each,
          },
        }),
    }) as PropertyDecorator,
  );
