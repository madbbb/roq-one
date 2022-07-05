import { applyDecorators } from '@nestjs/common';
import { buildMessage, IsByteLength as _IsByteLength, ValidationArguments, ValidationOptions } from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';

/**
 * Checks if the string's length (in bytes) falls in a range.
 * If given value is not a string, then it returns false.
 */
export const IsByteLength = (min: number, max?: number, validationOptions?: ValidationOptions) =>
  applyDecorators(
    _IsByteLength(min, max, {
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.IS_BYTE_LENGTH,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} ${arg.property} byte length must fall into (${arg.constraints[0]}, ${arg.constraints[1]}) range`;
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
