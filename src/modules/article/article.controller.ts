import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { RequestWithUser } from '../../app.types';
import { UserModel } from '../../database/postgres/entities';
import { User } from '../../decorators';
import { AuthGuard } from '../../guards';
import { ResultDto } from '../../shared';
import { ArticleService } from './article.service';
import {
  ArticleResponseBodyDto,
  CreateArticleRequestBodyDto,
  FindAllArticleRequestQueryDto,
  FindAllArticleResponseBodyDto,
  UpdateArticleRequestBodyDto,
} from './dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Создание статьи' })
  @ApiCreatedResponse({ type: ArticleResponseBodyDto })
  @Post()
  async create(
    @Body() articleDto: CreateArticleRequestBodyDto,
    @Request() req: RequestWithUser,
  ): Promise<ArticleResponseBodyDto> {
    return this.articleService.create(articleDto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Чтение всех статей' })
  @ApiOkResponse({ type: FindAllArticleResponseBodyDto })
  async findAll(@Query() query: FindAllArticleRequestQueryDto): Promise<FindAllArticleResponseBodyDto> {
    return this.articleService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Чтение статьи' })
  @ApiOkResponse({ type: ArticleResponseBodyDto })
  async findOne(@Param('id') id: number): Promise<ArticleResponseBodyDto> {
    return this.articleService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Обновление статьи' })
  @ApiOkResponse({ type: ArticleResponseBodyDto })
  @Put(':id')
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() dto: UpdateArticleRequestBodyDto,
    @User() user: UserModel,
  ): Promise<ArticleResponseBodyDto> {
    return this.articleService.update(id, dto, user.id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Удаление статьи' })
  @ApiOkResponse({ type: ResultDto })
  @Delete(':id')
  async remove(@Param('id', new ParseIntPipe()) id: number, @User() user: UserModel): Promise<ResultDto> {
    return this.articleService.remove(id, user.id);
  }
}
