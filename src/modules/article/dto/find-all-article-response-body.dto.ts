import { ApiProperty } from '@nestjs/swagger';
import { PaginationDto } from '../../../shared';
import { ArticleResponseBodyDto } from './article-response-body.dto';

export class FindAllArticleResponseBodyDto extends PaginationDto {
  @ApiProperty({
    type: ArticleResponseBodyDto,
    isArray: true,
  })
  items: ArticleResponseBodyDto[];
}
