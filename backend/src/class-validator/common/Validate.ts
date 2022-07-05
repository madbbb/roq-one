import { applyDecorators } from '@nestjs/common';
import { buildMessage, Validate as _Validate, ValidationArguments, ValidationOptions } from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';

/**
 * Performs validation based on the given custom validation class.
 * Validation class must be decorated with ValidatorConstraint decorator.
 */
export const Validate = (constraintClass: Function, validationOptions?: ValidationOptions) =>
  applyDecorators(
    _Validate(constraintClass, {
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.VALIDATE,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} ${arg.property} is not validated ${arg.constraints[0]}`;
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
