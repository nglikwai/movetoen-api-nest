/* eslint-disable */

import { ApiProperty } from '@nestjs/swagger';

import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';
import mongoose, { Types } from 'mongoose';

type ObjectId = mongoose.Types.ObjectId;

export function IsObjectId(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isObjectId',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return Types.ObjectId.isValid(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid MongoDB ObjectId`;
        },
      },
    });
  };
}

export class ParamsDto {
  @ApiProperty()
  @IsObjectId()
  id?: ObjectId;
}
