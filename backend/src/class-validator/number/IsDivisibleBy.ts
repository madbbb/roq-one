import { applyDecorators } from '@nestjs/common';
import { buildMessage, IsDivisibleBy as _IsDivisibleBy, ValidationArguments, ValidationOptions } from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';

/**
 * Checks if value is a number that's divisible by another.
 */
export const IsDivisibleBy = (num: number, validationOptions?: ValidationOptions) =>
  applyDecorators(
    _IsDivisibleBy(num, {
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.IS_DIVISIBLE_BY,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} ${arg.property} must be divisible by ${arg.constraints[0]}`;
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
