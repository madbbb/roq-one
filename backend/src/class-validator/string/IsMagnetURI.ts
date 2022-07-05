import { applyDecorators } from '@nestjs/common';
import { buildMessage, IsMagnetURI as _IsMagnetURI, ValidationArguments, ValidationOptions } from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';

/**
 * Check if the string is a magnet uri format.
 * If given value is not a string, then it returns false.
 */
export const IsMagnetURI = (validationOptions?: ValidationOptions) =>
  applyDecorators(
    _IsMagnetURI({
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.IS_MAGNET_URI,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} ${arg.property} must be magnet uri format`;
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
