import { applyDecorators } from '@nestjs/common';
import { ValidateBy as _ValidateBy, ValidateByOptions, ValidationArguments, ValidationOptions } from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';

/**
 * Performs validation based on the given custom validation class.
 * Validation class must be decorated with ValidatorConstraint decorator.
 */
export const ValidateBy = (options: ValidateByOptions, validationOptions?: ValidationOptions) =>
  applyDecorators(
    _ValidateBy(options, {
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.VALIDATE_BY,
          message: `${arg.property} is not validated  ${options}`,
          variables: {
            property: arg.property,
            values: arg.value,
            isValidationError: true,
            constraints: arg.constraints,
          },
        }),
    }) as PropertyDecorator,
  );
