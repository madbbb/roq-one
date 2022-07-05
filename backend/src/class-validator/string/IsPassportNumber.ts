import { applyDecorators } from '@nestjs/common';
import {
  buildMessage,
  IsPassportNumber as _IsPassportNumber,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';

/**
 * Check if the string is a valid passport number relative to a specific country code.
 * If given value is not a string, then it returns false.
 */
export const IsPassportNumber = (countryCode: string, validationOptions?: ValidationOptions) =>
  applyDecorators(
    _IsPassportNumber(countryCode, {
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.IS_PASSPORT_NUMBER,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} ${arg.property} must be valid passport number`;
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
