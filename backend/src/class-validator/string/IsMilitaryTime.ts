import { applyDecorators } from '@nestjs/common';
import {
  buildMessage,
  IsMilitaryTime as _IsMilitaryTime,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';

/**
 * Checks if the string represents a time without a given timezone in the format HH:MM (military)
 * If the given value does not match the pattern HH:MM, then it returns false.
 */
export const IsMilitaryTime = (validationOptions?: ValidationOptions) =>
  applyDecorators(
    _IsMilitaryTime({
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.IS_MILITARY_TIME,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} ${arg.property} must be a valid representation of military time in the format HH:MM`;
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
