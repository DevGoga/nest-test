import { Inject, Injectable } from '@nestjs/common';
import { DataSource, FindOptionsWhere, ILike } from 'typeorm';
import { ArticleModel } from '../../database/postgres/entities';
import { POSTGRES } from '../../database/postgres/postgres.constants';
import { ArticleDto, FindAllArticleQueryDto } from './dto';

@Injectable()
export class ArticleService {
  constructor(@Inject(POSTGRES) private readonly datasource: DataSource) {}
  public async createNewArticle(createArticleDto: ArticleDto, userId: number): Promise<ArticleModel> {
    const article = this.datasource.getRepository(ArticleModel).create(createArticleDto);

    article.authorId = userId;
    article.dateOfPublication = new Date();

    return this.datasource.getRepository(ArticleModel).save(article);
  }

  public async findAll(query: FindAllArticleQueryDto): Promise<{ items: ArticleModel[]; total: number }> {
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
}
