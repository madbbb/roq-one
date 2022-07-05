import { applyDecorators } from '@nestjs/common';
import { buildMessage, Length as _Length, ValidationArguments, ValidationOptions } from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';

/**
 * Checks if the string's length falls in a range. Note: this function takes into account surrogate pairs.
 * If given value is not a string, then it returns false.
 */
export const Length = (min: number, max?: number, validationOptions?: ValidationOptions) =>
  applyDecorators(
    _Length(min, max, {
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.LENGTH,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} ${arg.property} doesn't length falls in a range (${min} - ${max})`;
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
