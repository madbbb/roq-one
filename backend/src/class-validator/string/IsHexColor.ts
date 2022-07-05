import { applyDecorators } from '@nestjs/common';
import { buildMessage, IsHexColor as _IsHexColor, ValidationArguments, ValidationOptions } from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';

/**
 * Checks if the string is a hexadecimal color.
 * If given value is not a string, then it returns false.
 */
export const IsHexColor = (validationOptions?: ValidationOptions) =>
  applyDecorators(
    _IsHexColor({
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.IS_HEX_COLOR,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} ${arg.property} must be a hexadecimal color`;
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
