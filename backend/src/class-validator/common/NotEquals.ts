import { applyDecorators } from '@nestjs/common';
import { buildMessage, NotEquals as _NotEquals, ValidationArguments, ValidationOptions } from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';

/**
 * Checks if value does not match ("!==") the comparison.
 */
export const NotEquals = (comparison: any, validationOptions?: ValidationOptions) =>
  applyDecorators(
    _NotEquals(comparison, {
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.NOT_EQUALS,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} ${arg.property} should not be equal to ${arg.constraints[0]}`;
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
