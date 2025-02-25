import { ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, FindOptionsWhere, ILike } from 'typeorm';
import { ArticleModel } from '../../database/postgres/entities';
import { POSTGRES } from '../../database/postgres/postgres.constants';
import { ArticleDto, FindAllArticleQueryDto, UpdateArticleDto } from './dto';

@Injectable()
export class ArticleService {
  constructor(@Inject(POSTGRES) private readonly datasource: DataSource) {}

  async createNewArticle(createArticleDto: ArticleDto, userId: number): Promise<ArticleModel> {
    const article = this.datasource.getRepository(ArticleModel).create(createArticleDto);

    article.authorId = userId;
    article.dateOfPublication = new Date();

    return this.datasource.getRepository(ArticleModel).save(article);
  }

  async findAll(query: FindAllArticleQueryDto): Promise<{ items: ArticleModel[]; total: number }> {
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
      where: where,
    });

    return { items, total };
  }

  async update(id: number, updateArticleDto: UpdateArticleDto, userId: number): Promise<ArticleModel> {
    const article = await this.datasource.getRepository(ArticleModel).findOne({ where: { id } });

    if (!article) {
      throw new NotFoundException();
    }

    if (article.authorId !== userId) {
      throw new ForbiddenException('You are not allowed to update this article');
    }

    await this.datasource.getRepository(ArticleModel).update(id, updateArticleDto);

    const updatedArticle = await this.datasource.getRepository(ArticleModel).findOne({
      where: { id },
      relations: ['author'],
    });

    if (!updatedArticle) {
      throw new NotFoundException();
    }

    return updatedArticle;
  }
}
