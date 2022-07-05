import { applyDecorators } from '@nestjs/common';
import {
  buildMessage,
  IsEthereumAddress as _IsEthereumAddress,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import { ClassValidatorEnum } from 'src/class-validator';

/**
 * Check if the string is an Ethereum address using basic regex. Does not validate address checksums.
 * If given value is not a string, then it returns false.
 */
export const IsEthereumAddress = (validationOptions?: ValidationOptions) =>
  applyDecorators(
    _IsEthereumAddress({
      ...validationOptions,
      message: (arg: ValidationArguments) =>
        JSON.stringify({
          errorCode: ClassValidatorEnum.IS_ETHEREUM_ADDRESS,
          message: buildMessage(function(eachPrefix) {
            return `${eachPrefix} ${arg.property} must be an Ethereum address`;
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
