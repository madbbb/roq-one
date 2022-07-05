import { applyDecorators } from '@nestjs/common';
import { IsNotEmptyObject as _IsNotEmptyObject, ValidationArguments, ValidationOptions } from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';

/**
 * Checks if the value is valid Object & not empty.
 * Returns false if the value is not an object or an empty valid object.
 */
export const IsNotEmptyObject = (options?: { nullable?: boolean }, validationOptions?: ValidationOptions) =>
  applyDecorators(
    _IsNotEmptyObject(options, {
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.IS_NOT_EMPTY_OBJECT,
          message: `${arg.property} should not be an empty object`,
          variables: {
            property: arg.property,
            values: arg.value,
            isValidationError: true,
            constraints: arg.constraints,
          },
        }),
    }) as PropertyDecorator,
  );
