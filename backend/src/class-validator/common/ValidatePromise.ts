import { applyDecorators } from '@nestjs/common';
import { ValidatePromise as _ValidatePromise, ValidationArguments, ValidationOptions } from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';

/**
 * Objects / object arrays marked with this decorator will also be validated.
 */
export const ValidatePromise = (validationOptions?: ValidationOptions) =>
  applyDecorators(
    _ValidatePromise({
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.VALIDATE_PROMISE,
          message: `${arg.property} Resolve promise before validation`,
          variables: {
            property: arg.property,
            values: arg.value,
            isValidationError: true,
            constraints: arg.constraints,
          },
        }),
    }) as PropertyDecorator,
  );
