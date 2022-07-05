import { applyDecorators } from '@nestjs/common';
import {
  buildMessage,
  IsNumberString as _IsNumberString,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';
import ValidatorJS from 'validator';

/**
 * Checks if the string is numeric.
 * If given value is not a string, then it returns false.
 */
export const IsNumberString = (options?: ValidatorJS.IsNumericOptions, validationOptions?: ValidationOptions) =>
  applyDecorators(
    _IsNumberString(options, {
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.IS_NUMBER_STRING,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} ${arg.property} must be a number string`;
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
