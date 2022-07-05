import { applyDecorators } from '@nestjs/common';
import { buildMessage, IsObject as _IsObject, ValidationArguments, ValidationOptions } from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';

/**
 * Checks if the value is valid Object.
 * Returns false if the value is not an object.
 */
export const IsObject = (validationOptions?: ValidationOptions) =>
  applyDecorators(
    _IsObject({
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.IS_OBJECT,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} ${arg.property} must be an object`;
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
