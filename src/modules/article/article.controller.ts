import { Body, Controller, Get, Post, Query, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { RequestWithUser } from '../../app.types';
import { ArticleModel } from '../../database/postgres/entities';
import { AuthGuard } from '../../guards';
import { ArticleService } from './article.service';
import { AllArticleDto, ArticleDto, CreateArticleDto, FindAllArticleQueryDto } from './dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Создание статьи' })
  @ApiOkResponse({ type: CreateArticleDto })
  @Post('create')
  async create(@Body() articleDto: ArticleDto, @Request() req: RequestWithUser): Promise<ArticleModel> {
    return this.articleService.createNewArticle(articleDto, req.user.id);
  }

  @Get('findAll')
  @ApiOperation({ summary: 'Чтение всех статей' })
  @ApiOkResponse({ type: AllArticleDto })
  public async findAll(@Query() query: FindAllArticleQueryDto) {
    return this.articleService.findAll(query);
  }
}
