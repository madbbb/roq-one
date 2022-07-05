import { applyDecorators } from '@nestjs/common';
import { buildMessage, IsAlpha as _IsAlpha, ValidationArguments, ValidationOptions } from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';

/**
 * Checks if the string contains only letters (a-zA-Z).
 * If given value is not a string, then it returns false.
 */
export const IsAlpha = (locale?: string, validationOptions?: ValidationOptions) =>
  applyDecorators(
    _IsAlpha(locale, {
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.IS_ALPHA,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} ${arg.property} must contain only letters (a-zA-Z)`;
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
