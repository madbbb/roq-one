import { applyDecorators } from '@nestjs/common';
import { ArrayNotEmpty as _ArrayNotEmpty, buildMessage, ValidationArguments, ValidationOptions } from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';

/**
 * Checks if given array is not empty.
 * If null or undefined is given then this function returns false.
 */
export const ArrayNotEmpty = (validationOptions?: ValidationOptions) =>
  applyDecorators(
    _ArrayNotEmpty({
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.ARRAY_NOT_EMPTY,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} ${arg.property} should not be empty`;
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
