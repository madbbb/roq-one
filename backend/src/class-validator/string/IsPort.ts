import { applyDecorators } from '@nestjs/common';
import { buildMessage, IsPort as _IsPort, ValidationArguments, ValidationOptions } from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';

/**
 * Check if the string is a valid port number.
 */
export const IsPort = (validationOptions?: ValidationOptions) =>
  applyDecorators(
    _IsPort({
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.IS_PORT,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} ${arg.property} must be a port`;
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
