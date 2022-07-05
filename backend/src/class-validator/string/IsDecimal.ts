import { applyDecorators } from '@nestjs/common';
import { buildMessage, IsDecimal as _IsDecimal, ValidationArguments, ValidationOptions } from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';
import ValidatorJS from 'validator';

/**
 * Checks if the string is a valid decimal.
 * If given value is not a string, then it returns false.
 */
export const IsDecimal = (options?: ValidatorJS.IsDecimalOptions, validationOptions?: ValidationOptions) =>
  applyDecorators(
    _IsDecimal(options, {
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.IS_DECIMAL,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} ${arg.property} is not a valid decimal number.`;
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
