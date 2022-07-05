import { applyDecorators } from '@nestjs/common';
import { ArrayContains as _ArrayContains, buildMessage, ValidationArguments, ValidationOptions } from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';

/**
 * Checks if array contains all values from the given array of values.
 * If null or undefined is given then this function returns false.
 */
export const ArrayContains = (values: any[], validationOptions?: ValidationOptions) =>
  applyDecorators(
    _ArrayContains(values, {
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.ARRAY_CONTAIN,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} ${arg.property} must contain ${arg.constraints[0]} values`;
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
