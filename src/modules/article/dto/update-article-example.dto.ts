import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

export class UpdateArticleDtoExample {
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ example: 1 })
  id?: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ example: 'Автор' })
  title?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ example: 'Описание' })
  description?: string;

  @IsDateString()
  @IsOptional()
  @ApiProperty({ example: '2025-01-24T13:24:32.320Z' })
  dateOfPublication?: Date;

  @ApiProperty({ example: 1 })
  @IsOptional()
  @IsNumber()
  authorId?: number;

  @ApiProperty({
    example: {
      id: 1,
      email: 'email@email.com',
      password: '$2b$05$uzS8X/2X5YXQBVxhBjReXeL4ojbfRslQ9wlYukKtkikr1umneSQMqh',
      permissions: 'Base',
    },
  })
  @IsOptional()
  @IsObject()
  author?: object;
}
