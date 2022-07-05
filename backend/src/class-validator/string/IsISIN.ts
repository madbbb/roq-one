import { applyDecorators } from '@nestjs/common';
import { buildMessage, IsISIN as _IsISIN, ValidationArguments, ValidationOptions } from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';

/**
 * Checks if the string is an ISIN (stock/security identifier).
 * If given value is not a string, then it returns false.
 */
export const IsISIN = (validationOptions?: ValidationOptions) =>
  applyDecorators(
    _IsISIN({
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.IS_ISIN,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} ${arg.property} must be an ISIN`;
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
