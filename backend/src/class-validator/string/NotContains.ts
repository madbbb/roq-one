import { applyDecorators } from '@nestjs/common';
import { buildMessage, NotContains as _NotContains, ValidationArguments, ValidationOptions } from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';

/**
 * Checks if the string does not contain the seed.
 * If given value is not a string, then it returns false.
 */
export const NotContains = (seed: string, validationOptions?: ValidationOptions) =>
  applyDecorators(
    _NotContains(seed, {
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.NOT_CONTAINS,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} ${arg.property} should not contain a ${arg.constraints[0]} string`;
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
