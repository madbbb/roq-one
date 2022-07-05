import { applyDecorators } from '@nestjs/common';
import { buildMessage, IsCreditCard as _IsCreditCard, ValidationArguments, ValidationOptions } from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';

/**
 * Check if the string is a valid BTC address.
 * If given value is not a string, then it returns false.
 */
export const IsCreditCard = (validationOptions?: ValidationOptions) =>
  applyDecorators(
    _IsCreditCard({
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.IS_CREDIT_CARD,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} ${arg.property} must be a credit card`;
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
