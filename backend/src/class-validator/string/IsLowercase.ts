import { applyDecorators } from '@nestjs/common';
import { buildMessage, IsLowercase as _IsLowercase, ValidationArguments, ValidationOptions } from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';

/**
 * Checks if the string is lowercase.
 * If given value is not a string, then it returns false.
 */
export const IsLowercase = (validationOptions?: ValidationOptions) =>
  applyDecorators(
    _IsLowercase({
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.IS_LOWER_CASE,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} ${arg.property} must be a lower case string`;
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
