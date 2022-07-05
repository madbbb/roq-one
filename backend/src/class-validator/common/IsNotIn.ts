import { applyDecorators } from '@nestjs/common';
import { buildMessage, IsNotIn as _IsNotIn, ValidationArguments, ValidationOptions } from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';

/**
 * Checks if given value not in a array of allowed values.
 */
export const IsNotIn = (values: readonly any[], validationOptions?: ValidationOptions) =>
  applyDecorators(
    _IsNotIn(values, {
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.IS_NOT_IN,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} ${arg.property} should not be one of the following values: ${arg.constraints[0]}`;
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
