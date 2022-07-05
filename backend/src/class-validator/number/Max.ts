import { applyDecorators } from '@nestjs/common';
import { buildMessage, Max as _Max, ValidationArguments, ValidationOptions } from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';

/**
 * Checks if the first number is less than or equal to the second.
 */
export const Max = (maxValue: number, validationOptions?: ValidationOptions) =>
  applyDecorators(
    _Max(maxValue, {
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.MAX,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} ${arg.property} must not be greater than ${arg.constraints[0]}`;
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
