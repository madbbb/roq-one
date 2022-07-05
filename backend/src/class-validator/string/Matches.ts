import { applyDecorators } from '@nestjs/common';
import { buildMessage, Matches as _Matches, ValidationArguments, ValidationOptions } from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';

/**
 * Checks if string matches the pattern. Either matches('foo', /foo/i).
 * If given value is not a string, then it returns false.
 */
export const Matches = (pattern: string, modifiers?: string, validationOptions?: ValidationOptions) =>
  applyDecorators(
    _Matches(pattern, modifiers, {
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.MATCHES,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} ${arg.property} must match ${arg.constraints[0]} regular expression`;
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
