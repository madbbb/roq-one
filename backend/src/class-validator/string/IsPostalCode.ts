import { applyDecorators } from '@nestjs/common';
import { buildMessage, IsPostalCode as _IsPostalCode, ValidationArguments, ValidationOptions } from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';
import ValidatorJS from 'validator';

/**
 * Check if the string is a postal code,
 * (locale is one of [ 'AD', 'AT', 'AU', 'BE', 'BG', 'BR', 'CA', 'CH', 'CZ', 'DE', 'DK', 'DZ', 'EE', 'ES', 'FI', 'FR',
 *  'GB', 'GR', 'HR', 'HU', 'ID', 'IE' 'IL', 'IN', 'IR', 'IS', 'IT', 'JP', 'KE', 'LI', 'LT', 'LU', 'LV', 'MT', 'MX',
 *  'NL', 'NO', 'NZ', 'PL', 'PR', 'PT', 'RO', 'RU', 'SA', 'SE', 'SI', 'TN', 'TW', 'UA', 'US', 'ZA', 'ZM' ] OR 'any'.
 *  If 'any' is used, function will check if any of the locals match. Locale list is validator.isPostalCodeLocales.).
 * If given value is not a string, then it returns false.
 */
export const IsPostalCode = (locale?: 'any' | ValidatorJS.PostalCodeLocale, validationOptions?: ValidationOptions) =>
  applyDecorators(
    _IsPostalCode(locale, {
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.IS_POSTAL_CODE,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} ${arg.property} must be a postal code`;
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
