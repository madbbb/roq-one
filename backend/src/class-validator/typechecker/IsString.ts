import { applyDecorators } from '@nestjs/common';
import { buildMessage, IsString as _IsString, ValidationArguments, ValidationOptions } from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';

/**
 * Checks if a given value is a real string.
 */
export const IsString = (validationOptions?: ValidationOptions) =>
  applyDecorators(
    _IsString({
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.IS_STRING,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} ${arg.property} must be a string`;
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
