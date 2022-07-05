import { applyDecorators } from '@nestjs/common';
import { buildMessage, IsIBAN as _IsIBAN, ValidationArguments, ValidationOptions } from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';

/**
 * Check if a string is a IBAN (International Bank Account Number).
 * If given value is not a string, then it returns false.
 */
export const IsIBAN = (validationOptions?: ValidationOptions) =>
  applyDecorators(
    _IsIBAN({
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.IS_IBAN,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} ${arg.property} must be an IBAN`;
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
