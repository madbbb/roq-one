import { applyDecorators } from '@nestjs/common';
import { buildMessage, Contains as _Contains, ValidationArguments, ValidationOptions } from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';

/**
 * Checks if the first number is less than or equal to the second.
 */
export const Contains = (seed: string, validationOptions?: ValidationOptions) =>
  applyDecorators(
    _Contains(seed, {
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.CONTAINS,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} ${arg.property} must contain a ${arg.constraints[0]} string`;
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
