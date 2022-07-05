import { applyDecorators } from '@nestjs/common';
import { ValidateIf as _ValidateIf, ValidationArguments, ValidationOptions } from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';

/**
 * Ignores the other validators on a property when the provided condition function returns false.
 */
export const ValidateIf = (condition: (object: any, value: any) => boolean, validationOptions?: ValidationOptions) =>
  applyDecorators(
    _ValidateIf(condition, {
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.VALIDATE_IF,
          message: `${arg.property} is ignored`,
          variables: {
            property: arg.property,
            values: arg.value,
            isValidationError: true,
            constraints: arg.constraints,
          },
        }),
    }) as PropertyDecorator,
  );
