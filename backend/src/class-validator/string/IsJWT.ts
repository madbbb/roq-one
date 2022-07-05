import { applyDecorators } from '@nestjs/common';
import { buildMessage, IsJWT as _IsJWT, ValidationArguments, ValidationOptions } from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';

/**
 * Checks if the string is valid JWT token.
 * If given value is not a string, then it returns false.
 */
export const IsJWT = (validationOptions?: ValidationOptions) =>
  applyDecorators(
    _IsJWT({
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.IS_JWT,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} ${arg.property} must be a JWT string`;
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
