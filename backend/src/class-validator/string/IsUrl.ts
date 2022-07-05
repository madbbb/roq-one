import { applyDecorators } from '@nestjs/common';
import { buildMessage, IsUrl as _IsUrl, ValidationArguments, ValidationOptions } from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';
import ValidatorJS from 'validator';

/**
 * Checks if the string is an url.
 * If given value is not a string, then it returns false.
 */
export const IsUrl = (options?: ValidatorJS.IsURLOptions, validationOptions?: ValidationOptions) =>
  applyDecorators(
    _IsUrl(options, {
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.IS_URL,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} ${arg.property} must be an URL`;
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
