import { applyDecorators } from '@nestjs/common';
import { buildMessage, IsBoolean as _IsBoolean, ValidationArguments, ValidationOptions } from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';
/**
 * Checks if a given value is a boolean.
 */
export const IsBoolean = (validationOptions?: ValidationOptions) =>
  applyDecorators(
    _IsBoolean({
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.IS_BOOLEAN,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} ${arg.property} must be a boolean value`;
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
