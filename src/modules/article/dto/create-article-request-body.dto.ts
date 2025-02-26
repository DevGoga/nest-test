import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateArticleRequestBodyDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Новинки техники' })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Новостной дайджест от 26 февраля' })
  description: string;
}
