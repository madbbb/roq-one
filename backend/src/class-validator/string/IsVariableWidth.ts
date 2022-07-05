import { applyDecorators } from '@nestjs/common';
import {
  buildMessage,
  IsVariableWidth as _IsVariableWidth,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';

/**
 * Checks if the string contains variable-width chars.
 * If given value is not a string, then it returns false.
 */
export const IsVariableWidth = (validationOptions?: ValidationOptions) =>
  applyDecorators(
    _IsVariableWidth({
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.IS_VARIABLE_WIDTH,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} ${arg.property} must contain a full-width and half-width characters`;
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
