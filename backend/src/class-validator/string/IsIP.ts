import { applyDecorators } from '@nestjs/common';
import { buildMessage, IsIP as _IsIP, IsIpVersion, ValidationArguments, ValidationOptions } from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';

/**
 * Checks if the string is an IP (version 4 or 6).
 * If given value is not a string, then it returns false.
 */
export const IsIP = (version?: IsIpVersion, validationOptions?: ValidationOptions) =>
  applyDecorators(
    _IsIP(version, {
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.IS_IP,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} ${arg.property} must be an ip address`;
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
