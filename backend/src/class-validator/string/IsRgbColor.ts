import { applyDecorators } from '@nestjs/common';
import { buildMessage, IsRgbColor as _IsRgbColor, ValidationArguments, ValidationOptions } from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';

/**
 * Check if the string is a rgb or rgba color.
 * `includePercentValues` defaults to true. If you don't want to allow to set rgb or rgba values with percents,
 *  like rgb(5%,5%,5%), or rgba(90%,90%,90%,.3), then set it to false.
 * If given value is not a string, then it returns false.
 */
export const IsRgbColor = (includePercentValues?: boolean, validationOptions?: ValidationOptions) =>
  applyDecorators(
    _IsRgbColor(includePercentValues, {
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.IS_RGB_COLOR,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} ${arg.property} must be a rgb color`;
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
