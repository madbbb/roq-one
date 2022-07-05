import { applyDecorators } from '@nestjs/common';
import { ArrayMinSize as _ArrayMinSize, buildMessage, ValidationArguments, ValidationOptions } from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';

/**
 * Checks if the array's length is greater than or equal to the specified number.
 * If null or undefined is given then this function returns false.
 */
export const ArrayMinSize = (min: number, validationOptions?: ValidationOptions) =>
  applyDecorators(
    _ArrayMinSize(min, {
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.ARRAY_MIN_SIZE,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} ${arg.property} must contain at least ${arg.constraints[0]} elements`;
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
