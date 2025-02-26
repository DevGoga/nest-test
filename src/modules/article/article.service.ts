import { ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, FindOptionsWhere, ILike } from 'typeorm';
import { ArticleModel } from '../../database/postgres/entities';
import { POSTGRES } from '../../database/postgres/postgres.constants';
import { ARTICLE_CACHE_TTL } from '../../database/redis/redis.constants';
import { findAllArticlesCachingKey, findOneArticleCachingKey } from '../../database/redis/redis.keys';
import { RedisService } from '../../database/redis/redis.service';
import { ResultDto } from '../../shared';
import {
  ArticleResponseBodyDto,
  CreateArticleRequestBodyDto,
  FindAllArticleRequestQueryDto,
  FindAllArticleResponseBodyDto,
  UpdateArticleRequestBodyDto,
} from './dto';

@Injectable()
export class ArticleService {
  constructor(
    @Inject(POSTGRES) private readonly datasource: DataSource,
    private readonly redisService: RedisService,
  ) {}

  async create(dto: CreateArticleRequestBodyDto, userId: number): Promise<ArticleModel> {
    const article = this.datasource.getRepository(ArticleModel).create(dto);

    article.authorId = userId;
    article.dateOfPublication = new Date();

    return this.datasource.getRepository(ArticleModel).save(article);
  }

  async findAll(query: FindAllArticleRequestQueryDto): Promise<FindAllArticleResponseBodyDto> {
    // TODO: С кешированием не работал, реализовал как смог.
    // Мне кажется слой кеширования должен быть где-то отдельно, а не прямо внутри сервиса с бизнес-логикой
    const cacheKey = findAllArticlesCachingKey(query);
    const cache = await this.redisService.get<FindAllArticleResponseBodyDto>(cacheKey);

    if (cache) {
      return cache;
    }

    const { limit, offset, authorId, search } = query;

    const where: FindOptionsWhere<ArticleModel> = {};

    if (authorId) {
      where.authorId = authorId;
    }

    if (search) {
      where.title = ILike(`%${search}%`);
    }

    const [items, total] = await this.datasource.getRepository(ArticleModel).findAndCount({
      skip: offset,
      take: limit,
      where,
    });

    const response = { items, total, limit, offset };

    await this.redisService.set(cacheKey, response, { EX: ARTICLE_CACHE_TTL });

    return response;
  }

  async update(id: number, dto: UpdateArticleRequestBodyDto, userId: number): Promise<ArticleResponseBodyDto> {
    const article = await this.datasource.getRepository(ArticleModel).findOne({ where: { id } });

    if (!article) {
      throw new NotFoundException();
    }

    if (article.authorId !== userId) {
      throw new ForbiddenException('You are not allowed to update this article');
    }

    await this.datasource.getRepository(ArticleModel).update(id, dto);

    return this.findOne(id);
  }

  async remove(id: number, userId: number): Promise<ResultDto> {
    const article = await this.datasource.getRepository(ArticleModel).findOne({ where: { id } });

    if (!article) {
      throw new NotFoundException();
    }

    if (article.authorId !== userId) {
      throw new ForbiddenException('You are not allowed to delete this article');
    }

    await this.redisService.delete(findOneArticleCachingKey(id));

    await this.datasource.getRepository(ArticleModel).delete(id);

    return { result: true };
  }

  async findOne(id: number): Promise<ArticleResponseBodyDto> {
    const cacheKey = findOneArticleCachingKey(id);
    const cache = await this.redisService.get<ArticleResponseBodyDto>(cacheKey);

    if (cache) {
      return cache;
    }

    const article = await this.datasource.getRepository(ArticleModel).findOne({
      where: { id },
      // TODO: Вот здесь подгружаются все поля author, хотя нужно только id, name. Не разобрался как это ограничить, пароль юзера точно не должен отдаваться
      relations: ['author'],
    });

    if (!article) {
      throw new NotFoundException();
    }

    await this.redisService.set(cacheKey, article, { EX: ARTICLE_CACHE_TTL });

    return article;
  }
}
