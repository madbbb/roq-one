import { applyDecorators } from '@nestjs/common';
import { buildMessage, Min as _Min, ValidationArguments, ValidationOptions } from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';

/**
 * Checks if the first number is less than or equal to the second.
 */
export const Min = (minValue: number, validationOptions?: ValidationOptions) =>
  applyDecorators(
    _Min(minValue, {
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.MIN,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} ${arg.property} must not be less than ${arg.constraints[0]}`;
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
