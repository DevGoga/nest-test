import { ApiProperty } from '@nestjs/swagger';

export class ArticleResponseBodyDto {
  @ApiProperty({ example: 'Автор' })
  title: string;

  @ApiProperty({ example: 'Какое-то описание' })
  description: string;

  @ApiProperty({ example: 1 })
  authorId: number;

  @ApiProperty({ example: '2025-01-24T13:24:32.320Z' })
  dateOfPublication: Date;

  @ApiProperty({ example: 1 })
  id: number;
}
