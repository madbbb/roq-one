import { applyDecorators } from '@nestjs/common';
import { buildMessage, IsEmpty as _IsEmpty, ValidationArguments, ValidationOptions } from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';

/**
 * Checks if given value is empty (=== '', === null, === undefined).
 */
export const IsEmpty = (validationOptions?: ValidationOptions) =>
  applyDecorators(
    _IsEmpty({
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.IS_EMPTY,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} ${arg.property} must be empty`;
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
