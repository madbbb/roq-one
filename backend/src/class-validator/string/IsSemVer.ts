import { applyDecorators } from '@nestjs/common';
import { buildMessage, IsSemVer as _IsSemVer, ValidationArguments, ValidationOptions } from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';

/**
 * Check if the string is a Semantic Versioning Specification (SemVer).
 * If given value is not a string, then it returns false.
 */
export const IsSemVer = (validationOptions?: ValidationOptions) =>
  applyDecorators(
    _IsSemVer({
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.IS_SEM_VER,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} ${arg.property} must be a Semantic Versioning Specification`;
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
