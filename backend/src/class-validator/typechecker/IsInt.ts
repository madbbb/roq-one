import { applyDecorators } from '@nestjs/common';
import { buildMessage, IsInt as _IsInt, ValidationArguments, ValidationOptions } from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';

/**
 * Checks if value is an integer.
 */
export const IsInt = (validationOptions?: ValidationOptions) =>
  applyDecorators(
    _IsInt({
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.IS_INT,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} ${arg.property} must be an integer number`;
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
