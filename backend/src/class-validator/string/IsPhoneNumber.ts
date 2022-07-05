import { applyDecorators } from '@nestjs/common';
import { buildMessage, IsPhoneNumber as _IsPhoneNumber, ValidationArguments, ValidationOptions } from 'class-validator';
import { CountryCode } from 'libphonenumber-js';
import { ClassValidatorEnum } from 'src/class-validator';

/**
 * Checks if the string is a valid phone number. To successfully validate any phone number the text must include
 * the intl. calling code, if the calling code wont be provided then the region must be set.
 *
 * @param region 2 characters uppercase country code (e.g. DE, US, CH) for country specific validation.
 * If text doesn't start with the international calling code (e.g. +41), then you must set this parameter.
 */
export const IsPhoneNumber = (region?: CountryCode, validationOptions?: ValidationOptions) =>
  applyDecorators(
    _IsPhoneNumber(region, {
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.IS_PHONE_NUMBER,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} ${arg.property} must be a valid phone number`;
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
