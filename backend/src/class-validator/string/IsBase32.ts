import { applyDecorators } from '@nestjs/common';
import { buildMessage, IsBase32 as _IsBase32, ValidationArguments, ValidationOptions } from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';

/**
 * Check if a string is base32 encoded.
 * If given value is not a string, then it returns false.
 */
export const IsBase32 = (validationOptions?: ValidationOptions) =>
  applyDecorators(
    _IsBase32({
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.IS_BASE_32,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} ${arg.property} must be base32 encoded`;
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
