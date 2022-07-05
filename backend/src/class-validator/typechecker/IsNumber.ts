import { applyDecorators } from '@nestjs/common';
import {
  buildMessage,
  IsNumber as _IsNumber,
  IsNumberOptions,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';

/**
 * Checks if a value is a number.
 */
export const IsNumber = (options?: IsNumberOptions, validationOptions?: ValidationOptions) =>
  applyDecorators(
    _IsNumber(options, {
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.IS_NUMBER,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} ${arg.property} must be a number conforming to the specified constraints`;
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
