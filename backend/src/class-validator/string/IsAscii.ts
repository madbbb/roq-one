import { applyDecorators } from '@nestjs/common';
import { buildMessage, IsAscii as _IsAscii, ValidationArguments, ValidationOptions } from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';

/**
 * Checks if the string contains ASCII chars only.
 * If given value is not a string, then it returns false.
 */
export const IsAscii = (validationOptions?: ValidationOptions) =>
  applyDecorators(
    _IsAscii({
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.IS_ASCII,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} ${arg.property} must contain only ASCII characters`;
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
