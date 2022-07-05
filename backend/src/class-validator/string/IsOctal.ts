import { applyDecorators } from '@nestjs/common';
import { buildMessage, IsOctal as _IsOctal, ValidationArguments, ValidationOptions } from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';

/**
 * Check if the string is a valid octal number.
 * If given value is not a string, then it returns false.
 */
export const IsOctal = (validationOptions?: ValidationOptions) =>
  applyDecorators(
    _IsOctal({
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.IS_OCTAL,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} ${arg.property} must be valid octal number`;
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
