import { applyDecorators } from '@nestjs/common';
import { buildMessage, Equals as _Equals, ValidationArguments, ValidationOptions } from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';

/**
 * Checks if value matches ("===") the comparison.
 */
export const Equals = (comparison: any, validationOptions?: ValidationOptions) =>
  applyDecorators(
    _Equals(comparison, {
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.EQUALS,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} ${arg.property}'s must be equal to ${arg.constraints[0]}`;
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
