import { applyDecorators } from '@nestjs/common';
import {
  buildMessage,
  IsBooleanString as _IsBooleanString,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';

/**
 * Checks if a string is a boolean.
 * If given value is not a string, then it returns false.
 */
export const IsBooleanString = (validationOptions?: ValidationOptions) =>
  applyDecorators(
    _IsBooleanString({
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.IS_BOOLEAN_STRING,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} ${arg.property} must be a boolean string`;
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
