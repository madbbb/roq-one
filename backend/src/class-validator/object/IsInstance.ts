import { applyDecorators } from '@nestjs/common';
import { IsInstance as _IsInstance, ValidationArguments, ValidationOptions } from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';

/**
 * Checks if the value is an instance of the specified object.
 */
export const IsInstance = (targetType: new (...args: any[]) => any, validationOptions?: ValidationOptions) =>
  applyDecorators(
    _IsInstance(targetType, {
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.IS_INSTANCE,
          message: `${arg.property} is not instance of the specified object`,
          variables: {
            property: arg.property,
            values: arg.value,
            isValidationError: true,
            constraints: arg.constraints,
          },
        }),
    }) as PropertyDecorator,
  );
