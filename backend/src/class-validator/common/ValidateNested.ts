import { applyDecorators } from '@nestjs/common';
import {
  buildMessage,
  ValidateNested as _ValidateNested,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';

/**
 * Objects / object arrays marked with this decorator will also be validated.
 */
export const ValidateNested = (validationOptions?: ValidationOptions) =>
  applyDecorators(
    _ValidateNested({
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.VALIDATE_NESTED,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} ${arg.property} must be either object or array`;
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
