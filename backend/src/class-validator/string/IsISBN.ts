import { applyDecorators } from '@nestjs/common';
import {
  buildMessage,
  IsISBN as _IsISBN,
  IsISBNVersion,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';

/**
 * Checks if the string is an IP (version 4 or 6).
 * If given value is not a string, then it returns false.
 */
export const IsISBN = (version?: IsISBNVersion, validationOptions?: ValidationOptions) =>
  applyDecorators(
    _IsISBN(version, {
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.IS_ISBN,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} ${arg.property} must be an ISBN`;
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
