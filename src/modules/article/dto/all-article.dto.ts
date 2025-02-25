import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';

export class AllArticleDto {
  @IsString()
  @IsArray()
  @ApiProperty({
    example: [
      { id: 2, title: 'title', description: 'description', dateOfPublication: '2025-02-25T19:41:58.806Z', authorId: 5 },
    ],
  })
  items: object[];

  @IsNumber()
  @ApiProperty({ example: 1 })
  total: number;
}
