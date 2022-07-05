import { applyDecorators } from '@nestjs/common';
import { buildMessage, IsArray as _IsArray, ValidationArguments, ValidationOptions } from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';

/**
 * Checks if a given value is an array
 */
export const IsArray = (validationOptions?: ValidationOptions) =>
  applyDecorators(
    _IsArray({
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.IS_ARRAY,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} ${arg.property} must be an array`;
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
