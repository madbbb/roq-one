import { applyDecorators } from '@nestjs/common';
import { buildMessage, MinDate as _MinDate, ValidationArguments, ValidationOptions } from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';

/**
 * Checks if the value is a date that's after the specified date.
 */
export const MinDate = (date: Date, validationOptions?: ValidationOptions) =>
  applyDecorators(
    _MinDate(date, {
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.MIN_DATE,
          message: buildMessage(function(eachPrefix) {
            return `minimal allowed date for ${eachPrefix} ${arg.property} is ${arg.constraints[0]}`;
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
