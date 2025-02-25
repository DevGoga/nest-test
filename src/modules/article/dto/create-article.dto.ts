import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Автор' })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Какое-то описание' })
  description: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  authorId: number;

  @IsDateString()
  @ApiProperty({ example: '2025-01-24T13:24:32.320Z' })
  dateOfPublication: Date;

  @ApiProperty({ example: 1 })
  @IsNumber()
  id: number;
}
