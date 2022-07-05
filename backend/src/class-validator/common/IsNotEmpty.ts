import { applyDecorators } from '@nestjs/common';
import { buildMessage, IsNotEmpty as _IsNotEmpty, ValidationArguments, ValidationOptions } from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';

/**
 * Checks if given value is not empty (!== '', !== null, !== undefined).
 */
export const IsNotEmpty = (validationOptions?: ValidationOptions) =>
  applyDecorators(
    _IsNotEmpty({
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.IS_NOT_EMPTY,
          message: buildMessage(function(eachPrefix) {
            return eachPrefix + `${arg.property} should not be empty`;
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
