import { applyDecorators } from '@nestjs/common';
import {
  buildMessage,
  IsAlphanumeric as _IsAlphanumeric,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';

/**
 * Checks if the string contains only letters and numbers.
 * If given value is not a string, then it returns false.
 */
export const IsAlphanumeric = (locale?: string, validationOptions?: ValidationOptions) =>
  applyDecorators(
    _IsAlphanumeric(locale, {
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.IS_ALPHA_NUMERIC,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} ${arg.property} must contain only letters and numbers`;
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
