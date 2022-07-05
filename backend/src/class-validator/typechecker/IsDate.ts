import { applyDecorators } from '@nestjs/common';
import { buildMessage, IsDate as _IsDate, ValidationArguments, ValidationOptions } from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';
/**
 * Checks if a given value is a date.
 */
export const IsDate = (validationOptions?: ValidationOptions) =>
  applyDecorators(
    _IsDate({
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.IS_DATE,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} ${arg.property} must be a Date instance`;
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
