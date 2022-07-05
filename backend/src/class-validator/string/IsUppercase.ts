import { applyDecorators } from '@nestjs/common';
import { buildMessage, IsUppercase as _IsUppercase, ValidationArguments, ValidationOptions } from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';

/**
 * Checks if the string is uppercase.
 * If given value is not a string, then it returns false.
 */
export const IsUppercase = (validationOptions?: ValidationOptions) =>
  applyDecorators(
    _IsUppercase({
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.IS_UPPER_CASE,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} ${arg.property} must contain an uppercase string`;
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
