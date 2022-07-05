import { applyDecorators } from '@nestjs/common';
import { buildMessage, IsBase64 as _IsBase64, ValidationArguments, ValidationOptions } from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';

/**
 * Check if a string is base32 encoded.
 * If given value is not a string, then it returns false.
 */
export const IsBase64 = (validationOptions?: ValidationOptions) =>
  applyDecorators(
    _IsBase64({
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.IS_BASE_64,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} ${arg.property} must be base64 encoded`;
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
