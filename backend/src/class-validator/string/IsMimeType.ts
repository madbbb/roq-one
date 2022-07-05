import { applyDecorators } from '@nestjs/common';
import { buildMessage, IsMimeType as _IsMimeType, ValidationArguments, ValidationOptions } from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';

/**
 * Check if the string matches to a valid MIME type format
 * If given value is not a string, then it returns false.
 */
export const IsMimeType = (validationOptions?: ValidationOptions) =>
  applyDecorators(
    _IsMimeType({
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.IS_MIME_TYPE,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} ${arg.property} must be  MIME type format`;
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
