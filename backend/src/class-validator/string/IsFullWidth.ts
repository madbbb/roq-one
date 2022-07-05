import { applyDecorators } from '@nestjs/common';
import { buildMessage, IsFullWidth as _IsFullWidth, ValidationArguments, ValidationOptions } from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';

/**
 * Checks if the string contains any full-width chars.
 * If given value is not a string, then it returns false.
 */
export const IsFullWidth = (validationOptions?: ValidationOptions) =>
  applyDecorators(
    _IsFullWidth({
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.IS_FULL_WIDTH,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} ${arg.property} must contain a full-width characters`;
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
