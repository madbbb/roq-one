import { applyDecorators } from '@nestjs/common';
import { buildMessage, IsPositive as _IsPositive, ValidationArguments, ValidationOptions } from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';

/**
 * Checks if the value is a negative number smaller than zero.
 */
export const IsPositive = (validationOptions?: ValidationOptions) =>
  applyDecorators(
    _IsPositive({
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.IS_POSITIVE,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} ${arg.property} must be a positive number`;
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
