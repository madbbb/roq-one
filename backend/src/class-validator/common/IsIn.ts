import { applyDecorators } from '@nestjs/common';
import { buildMessage, IsIn as _IsIn, ValidationArguments, ValidationOptions } from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';

/**
 * Checks if given value is in a array of allowed values.
 */
export const IsIn = (values: readonly any[], validationOptions?: ValidationOptions) =>
  applyDecorators(
    _IsIn(values, {
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.IS_IN,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} ${arg.property} must be one of the following values: ${arg.constraints[0]}`;
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
