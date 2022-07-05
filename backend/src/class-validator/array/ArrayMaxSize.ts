import { applyDecorators } from '@nestjs/common';
import { ArrayMaxSize as _ArrayMaxSize, buildMessage, ValidationArguments, ValidationOptions } from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';

/**
 * Checks if the array's length is less or equal to the specified number.
 * If null or undefined is given then this function returns false.
 */
export const ArrayMaxSize = (max: number, validationOptions?: ValidationOptions) =>
  applyDecorators(
    _ArrayMaxSize(max, {
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.ARRAY_MAX_SIZE,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} ${arg.property} must contain not more than ${arg.constraints[0]} elements`;
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
