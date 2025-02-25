import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateArticleDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ example: 'Заркуа Г.Т.' })
  title?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ example: 'Книга олицитворяет мои мучения в backend' })
  description?: string;

  @IsDateString()
  @IsOptional()
  @ApiProperty({ example: '2025-01-24T13:24:32.320Z' })
  dateOfPublication?: Date;

  @ApiProperty({ example: 1 })
  @IsOptional()
  @IsNumber()
  authorId?: number;
}
