import { applyDecorators } from '@nestjs/common';
import { buildMessage, IsRFC3339 as _IsRFC3339, ValidationArguments, ValidationOptions } from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';

/**
 * Check if the string is a valid RFC 3339 date.
 * If given value is not a string, then it returns false.
 */
export const IsRFC3339 = (validationOptions?: ValidationOptions) =>
  applyDecorators(
    _IsRFC3339({
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.IS_RFC_3339,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} ${arg.property} must be RFC 3339 date`;
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
