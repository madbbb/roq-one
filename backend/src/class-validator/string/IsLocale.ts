import { applyDecorators } from '@nestjs/common';
import { buildMessage, IsLocale as _IsLocale, ValidationArguments, ValidationOptions } from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';

/**
 * Check if the string is a locale.
 * If given value is not a string, then it returns false.
 */
export const IsLocale = (validationOptions?: ValidationOptions) =>
  applyDecorators(
    _IsLocale({
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.IS_LOCALE,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} ${arg.property} must be a locale`;
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
