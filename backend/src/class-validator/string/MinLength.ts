import { applyDecorators } from '@nestjs/common';
import { buildMessage, MinLength as _MinLength, ValidationArguments, ValidationOptions } from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';

/**
 * Checks if the string's MinLength is not more than given number.
 *  Note: this function takes into account surrogate pairs.
 * If given value is not a string, then it returns false.
 */
export const MinLength = (min: number, validationOptions?: ValidationOptions) =>
  applyDecorators(
    _MinLength(min, {
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.MIN_LENGTH,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} ${arg.property} must be longer than or equal to ${arg.constraints[0]} characters`;
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
