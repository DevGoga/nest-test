import { Controller, Get, Query } from '@nestjs/common';
import { ArticleService } from './article.service';
import { FindAllArticleQueryDto } from './dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  public async findAll(@Query() query: FindAllArticleQueryDto) {
    return this.articleService.findAll(query);
  }
}
