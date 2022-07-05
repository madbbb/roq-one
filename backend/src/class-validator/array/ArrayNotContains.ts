import { applyDecorators } from '@nestjs/common';
import {
  ArrayNotContains as _ArrayNotContains,
  buildMessage,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';

/**
 * Checks if array does not contain any of the given values.
 * If null or undefined is given then this function returns false.
 */
export const ArrayNotContains = (values: any[], validationOptions?: ValidationOptions) =>
  applyDecorators(
    _ArrayNotContains(values, {
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.ARRAY_NOT_CONTAINS,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} ${arg.property} should not contain ${arg.constraints[0]} values`;
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
