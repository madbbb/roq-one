import { applyDecorators } from '@nestjs/common';
import { buildMessage, IsEnum as _IsEnum, ValidationArguments, ValidationOptions } from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';
/**
 * Checks if a given value is an enum
 */
export const IsEnum = (entity: object, validationOptions?: ValidationOptions) =>
  applyDecorators(
    _IsEnum(entity, {
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.IS_ENUM,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} ${arg.property} must be a valid enum value`;
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
