import { applyDecorators } from '@nestjs/common';
import { Allow as _Allow, ValidationArguments, ValidationOptions } from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';

/**
 * If object has both allowed and not allowed properties a validation error will be thrown.
 */
export const Allow = (validationOptions?: ValidationOptions) =>
  applyDecorators(
    _Allow({
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.SHOULD_ALLOW,
          message: `${arg.property} allowed ${arg.value}`,
          variables: {
            property: arg.property,
            values: arg.value,
            isValidationError: true,
            constraints: arg.constraints,
          },
        }),
    }) as PropertyDecorator,
  );
