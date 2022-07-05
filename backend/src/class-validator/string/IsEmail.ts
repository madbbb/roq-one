import { applyDecorators } from '@nestjs/common';
import { buildMessage, IsEmail as _IsEmail, ValidationArguments, ValidationOptions } from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';
import { Trim } from 'src/library/decorators';
import ValidatorJS from 'validator';

/**
 * Checks if the string is an email.
 * If given value is not a string, then it returns false.
 */
export const IsEmail = (options?: ValidatorJS.IsEmailOptions, validationOptions?: ValidationOptions) =>
  applyDecorators(
    Trim,
    _IsEmail(options, {
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.IS_EMAIL,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} ${arg.property} must be an email`;
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
