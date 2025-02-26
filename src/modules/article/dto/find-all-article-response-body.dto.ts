import { ApiProperty } from '@nestjs/swagger';
import { ArticleResponseBodyDto } from './article-response-body.dto';

export class FindAllArticleResponseBodyDto {
  @ApiProperty({
    type: ArticleResponseBodyDto,
    isArray: true,
  })
  items: ArticleResponseBodyDto[];

  @ApiProperty({ example: 1 })
  total: number;
}
