import { applyDecorators } from '@nestjs/common';
import { buildMessage, IsJSON as _IsJSON, ValidationArguments, ValidationOptions } from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';

/**
 * Checks if the string is valid JSON (note: uses JSON.parse).
 * If given value is not a string, then it returns false.
 */
export const IsJSON = (validationOptions?: ValidationOptions) =>
  applyDecorators(
    _IsJSON({
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.IS_JSON,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} ${arg.property} must be a json string`;
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
