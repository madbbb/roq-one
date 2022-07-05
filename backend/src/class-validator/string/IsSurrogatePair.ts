import { applyDecorators } from '@nestjs/common';
import {
  buildMessage,
  IsSurrogatePair as _IsSurrogatePair,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';

/**
 * Checks if the string contains any surrogate pairs chars.
 * If given value is not a string, then it returns false.
 */
export const IsSurrogatePair = (validationOptions?: ValidationOptions) =>
  applyDecorators(
    _IsSurrogatePair({
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.IS_SURROGATE_PAIR,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} ${arg.property} must contain any surrogate pairs chars`;
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
