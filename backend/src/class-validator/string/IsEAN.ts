import { applyDecorators } from '@nestjs/common';
import { buildMessage, IsEAN as _IsEAN, ValidationArguments, ValidationOptions } from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';

/**
 * Check if the string is an EAN (European Article Number).
 * If given value is not a string, then it returns false.
 */
export const IsEAN = (validationOptions?: ValidationOptions) =>
  applyDecorators(
    _IsEAN({
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.IS_EAN,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} ${arg.property} must be an EAN (European Article Number)`;
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
