import { applyDecorators } from '@nestjs/common';
import { ClassConstructor, plainToInstance, Transform } from 'class-transformer';
import { ValidateNested } from 'class-validator';

export const NestedConfigDto = (cls: ClassConstructor<any>): PropertyDecorator => {
  return applyDecorators(
    ValidateNested(),
    Transform(({ value }) => plainToInstance(cls, value)),
  );
};
