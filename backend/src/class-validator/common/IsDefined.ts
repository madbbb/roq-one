import { applyDecorators } from '@nestjs/common';
import { buildMessage, IsDefined as _IsDefined, ValidationArguments, ValidationOptions } from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';

/**
 * Checks if value is defined (!== undefined, !== null).
 */
export const IsDefined = (validationOptions?: ValidationOptions) =>
  applyDecorators(
    _IsDefined({
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.IS_DEFINED,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} ${arg.property} should not be null or undefined`;
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
