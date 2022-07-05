import { applyDecorators } from '@nestjs/common';
import {
  ArrayUnique as _ArrayUnique,
  ArrayUniqueIdentifier,
  buildMessage,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';

/**
 * Checks if all array's values are unique. Comparison for objects is reference-based.
 * If null or undefined is given then this function returns false.
 */
export const ArrayUnique = (
  array: ArrayUniqueIdentifier<[]> | ValidationOptions,
  validationOptions?: ValidationOptions,
) =>
  applyDecorators(
    _ArrayUnique(array, {
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.ARRAY_UNIQUE,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} All ${arg.property}'s elements must be unique`;
          }, validationOptions)(),
          variables: {
            property: arg.property,
            value: arg.value,
            isValidationError: true,
            constraints: arg.constraints,
            each: validationOptions?.each,
          },
        }),
    }) as PropertyDecorator,
  );
