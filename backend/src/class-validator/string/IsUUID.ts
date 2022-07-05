import { applyDecorators } from '@nestjs/common';
import { buildMessage, IsUUID as _IsUUID, UUIDVersion, ValidationArguments, ValidationOptions } from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';

/**
 * Checks if the string is a UUID (version 3, 4 or 5).
 * If given value is not a string, then it returns false.
 */
export const IsUUID = (version?: UUIDVersion, validationOptions?: ValidationOptions) =>
  applyDecorators(
    _IsUUID(version, {
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.IS_UUID,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} ${arg.property} must be a UUID`;
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
