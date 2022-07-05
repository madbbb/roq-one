import { applyDecorators } from '@nestjs/common';
import { buildMessage, IsMongoId as _IsMongoId, ValidationArguments, ValidationOptions } from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';

/**
 * Checks if the string is a valid hex-encoded representation of a MongoDB ObjectId.
 * If given value is not a string, then it returns false.
 */
export const IsMongoId = (validationOptions?: ValidationOptions) =>
  applyDecorators(
    _IsMongoId({
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.IS_MONGO_ID,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} ${arg.property} must be a mongodb id`;
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
