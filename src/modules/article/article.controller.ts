import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { RequestWithUser } from '../../app.types';
import { ArticleModel } from '../../database/postgres/entities';
import { AuthGuard } from '../../guards';
import { ResultDto } from '../../shared';
import { ArticleService } from './article.service';
import {
  ArticleDto,
  CreateArticleExampleDto,
  FindAllArticleQueryDto,
  FindAllArticleQueryDtoExample,
  UpdateArticleDto,
  UpdateArticleDtoExample,
} from './dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Создание статьи' })
  @ApiOkResponse({ type: CreateArticleExampleDto })
  @Post('create')
  async create(@Body() articleDto: ArticleDto, @Request() req: RequestWithUser): Promise<ArticleModel> {
    return this.articleService.createNewArticle(articleDto, req.user.id);
  }

  @Get('findAll')
  @ApiOperation({ summary: 'Чтение всех статей' })
  @ApiOkResponse({ type: FindAllArticleQueryDtoExample })
  public async findAll(@Query() query: FindAllArticleQueryDto) {
    return this.articleService.findAll(query);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Обновление статьи' })
  @ApiOkResponse({ type: UpdateArticleDtoExample })
  @Patch('update/:id')
  async update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto, @Request() req: RequestWithUser) {
    return this.articleService.update(+id, updateArticleDto, req.user.id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Удаление статьи' })
  @ApiOkResponse({ type: ResultDto })
  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req: RequestWithUser) {
    return this.articleService.remove(+id, req.user.id);
  }
}
