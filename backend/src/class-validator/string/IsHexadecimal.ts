import { applyDecorators } from '@nestjs/common';
import { buildMessage, IsHexadecimal as _IsHexadecimal, ValidationArguments, ValidationOptions } from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';

/**
 * Checks if the string contains any full-width chars.
 * If given value is not a string, then it returns false.
 */
export const IsHexadecimal = (validationOptions?: ValidationOptions) =>
  applyDecorators(
    _IsHexadecimal({
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.IS_HEXA_DECIMAL,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} ${arg.property} must be a hexadecimal number`;
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
