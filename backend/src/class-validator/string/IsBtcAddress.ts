import { applyDecorators } from '@nestjs/common';
import { buildMessage, IsBtcAddress as _IsBtcAddress, ValidationArguments, ValidationOptions } from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';

/**
 * Check if the string is a valid BTC address.
 * If given value is not a string, then it returns false.
 */
export const IsBtcAddress = (validationOptions?: ValidationOptions) =>
  applyDecorators(
    _IsBtcAddress({
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.IS_BTC_ADDRESS,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} ${arg.property} must be a BTC address`;
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
