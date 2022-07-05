import { applyDecorators } from '@nestjs/common';
import { buildMessage, MaxDate as _MaxDate, ValidationArguments, ValidationOptions } from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';

/**
 * Checks if the value is a date that's after the specified date.
 */
export const MaxDate = (date: Date, validationOptions?: ValidationOptions) =>
  applyDecorators(
    _MaxDate(date, {
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.MAX_DATE,
          message: buildMessage(function(eachPrefix) {
            return `maximal allowed date for ${eachPrefix} ${arg.property} is ${arg.constraints[0]}`;
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
