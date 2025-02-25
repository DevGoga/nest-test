import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ArticleDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Преступление и наказание' })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Книга олицитворяет мои мучения в backend' })
  description: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  authorId: number;
}
