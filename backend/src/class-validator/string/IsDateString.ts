import { applyDecorators } from '@nestjs/common';
import { buildMessage, IsDateString as _IsDateString, ValidationArguments, ValidationOptions } from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';
import ValidatorJS from 'validator';

/**
 * Alias for IsISO8601 validator
 */
export const IsDateString = (options?: ValidatorJS.IsISO8601Options, validationOptions?: ValidationOptions) =>
  applyDecorators(
    _IsDateString(options, {
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.IS_DATE_STRING,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} ${arg.property} must be a valid ISO 8601 date string`;
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
