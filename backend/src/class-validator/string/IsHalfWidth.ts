import { applyDecorators } from '@nestjs/common';
import { buildMessage, IsHalfWidth as _IsHalfWidth, ValidationArguments, ValidationOptions } from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';

/**
 * Checks if the string contains any full-width chars.
 * If given value is not a string, then it returns false.
 */
export const IsHalfWidth = (validationOptions?: ValidationOptions) =>
  applyDecorators(
    _IsHalfWidth({
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.IS_HALF_WIDTH,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} ${arg.property} must contain a half-width characters`;
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
