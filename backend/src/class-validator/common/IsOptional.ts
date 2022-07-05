import { applyDecorators } from '@nestjs/common';
import { IsOptional as _IsOptional, ValidationArguments, ValidationOptions } from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';

/**
 * Checks if given value is not empty (!== '', !== null, !== undefined).
 */
export const IsOptional = (validationOptions?: ValidationOptions) =>
  applyDecorators(
    _IsOptional({
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.IS_OPTIONAL,
          message: `${arg.property} is optional`,
          variables: {
            property: arg.property,
            values: arg.value,
            isValidationError: true,
            constraints: arg.constraints,
          },
        }),
    }) as PropertyDecorator,
  );
