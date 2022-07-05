import { applyDecorators } from '@nestjs/common';
import { buildMessage, IsNegative as _IsNegative, ValidationArguments, ValidationOptions } from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';

/**
 * Checks if the value is a negative number smaller than zero.
 */
export const IsNegative = (validationOptions?: ValidationOptions) =>
  applyDecorators(
    _IsNegative({
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.IS_NEGATIVE,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} ${arg.property} must be a negative number`;
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
