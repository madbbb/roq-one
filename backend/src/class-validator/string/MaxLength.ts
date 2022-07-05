import { applyDecorators } from '@nestjs/common';
import { buildMessage, MaxLength as _MaxLength, ValidationArguments, ValidationOptions } from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';

/**
 * Checks if the string's MaxLength is not more than given number.
 *  Note: this function takes into account surrogate pairs.
 * If given value is not a string, then it returns false.
 */
export const MaxLength = (max: number, validationOptions?: ValidationOptions) =>
  applyDecorators(
    _MaxLength(max, {
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.MAX_LENGTH,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} ${arg.property} must be shorter than or equal to ${arg.constraints[0]} characters`;
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
