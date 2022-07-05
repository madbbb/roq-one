import { applyDecorators } from '@nestjs/common';
import { buildMessage, IsMultibyte as _IsMultibyte, ValidationArguments, ValidationOptions } from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';

/**
 * Checks if the string contains one or more multibyte chars.
 * If given value is not a string, then it returns false.
 */
export const IsMultibyte = (validationOptions?: ValidationOptions) =>
  applyDecorators(
    _IsMultibyte({
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.IS_MULTI_BYTE,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} ${arg.property} must contain one or more multibyte chars`;
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
