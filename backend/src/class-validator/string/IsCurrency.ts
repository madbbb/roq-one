import { applyDecorators } from '@nestjs/common';
import { buildMessage, IsCurrency as _IsCurrency, ValidationArguments, ValidationOptions } from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';
import ValidatorJS from 'validator';

/**
 * Checks if the string is a valid currency amount.
 * If given value is not a string, then it returns false.
 */
export const IsCurrency = (options?: ValidatorJS.IsCurrencyOptions, validationOptions?: ValidationOptions) =>
  applyDecorators(
    _IsCurrency(options, {
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.IS_CURRENCY,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} ${arg.property} must be a currency`;
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
