import { applyDecorators } from '@nestjs/common';
import { buildMessage, IsBIC as _IsBIC, ValidationArguments, ValidationOptions } from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';

/**
 * Check if a string is a BIC (Bank Identification Code) or SWIFT code.
 * If given value is not a string, then it returns false.
 */
export const IsBIC = (validationOptions?: ValidationOptions) =>
  applyDecorators(
    _IsBIC({
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.IS_BIC,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} ${arg.property} must be a BIC or SWIFT code`;
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
