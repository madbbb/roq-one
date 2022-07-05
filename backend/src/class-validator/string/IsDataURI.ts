import { applyDecorators } from '@nestjs/common';
import { buildMessage, IsDataURI as _IsDataURI, ValidationArguments, ValidationOptions } from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';

/**
 * Check if the string is a data uri format.
 * If given value is not a string, then it returns false.
 */
export const IsDataURI = (validationOptions?: ValidationOptions) =>
  applyDecorators(
    _IsDataURI({
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.IS_DATA_URI,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} ${arg.property} must be a data uri format`;
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
