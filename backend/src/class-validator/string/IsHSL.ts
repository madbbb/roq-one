import { applyDecorators } from '@nestjs/common';
import { buildMessage, IsHSL as _IsHSL, ValidationArguments, ValidationOptions } from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';

/**
 * Check if the string is an HSL (hue, saturation, lightness, optional alpha)
 *  color based on CSS Colors Level 4 specification.
 * Comma-separated format supported.
 *  Space-separated format supported with the exception of a few edge cases (ex: hsl(200grad+.1%62%/1)).
 * If given value is not a string, then it returns false.
 */
export const IsHSL = (validationOptions?: ValidationOptions) =>
  applyDecorators(
    _IsHSL({
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.IS_HSL,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} ${arg.property} must be a HSL color`;
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
