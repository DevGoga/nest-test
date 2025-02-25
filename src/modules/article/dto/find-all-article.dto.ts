import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class FindAllArticleQueryDto {
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  authorId?: number;

  @ApiPropertyOptional({ example: 'техника' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ example: 100, default: 100 })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  limit: number = 100;

  @ApiPropertyOptional({ example: 0, default: 0 })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  offset: number = 0;
}
