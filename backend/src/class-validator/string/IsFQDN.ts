import { applyDecorators } from '@nestjs/common';
import { buildMessage, IsFQDN as _IsFQDN, ValidationArguments, ValidationOptions } from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';
import ValidatorJS from 'validator';

/*
 * Checks if the string is a fully qualified domain name (e.g. domain.com).
 * If given value is not a string, then it returns false.
 */
export const IsFQDN = (options?: ValidatorJS.IsFQDNOptions, validationOptions?: ValidationOptions) =>
  applyDecorators(
    _IsFQDN(options, {
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.IS_FQDN,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} ${arg.property} must be a valid domain name`;
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
