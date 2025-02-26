import { ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, FindOptionsWhere, ILike } from 'typeorm';
import { ArticleModel } from '../../database/postgres/entities';
import { POSTGRES } from '../../database/postgres/postgres.constants';
import { CreateArticleRequestBodyDto, FindAllArticleRequestQueryDto, UpdateArticleRequestBodyDto } from './dto';

@Injectable()
export class ArticleService {
  constructor(@Inject(POSTGRES) private readonly datasource: DataSource) {}

  async create(dto: CreateArticleRequestBodyDto, userId: number): Promise<ArticleModel> {
    const article = this.datasource.getRepository(ArticleModel).create(dto);

    article.authorId = userId;
    article.dateOfPublication = new Date();

    return this.datasource.getRepository(ArticleModel).save(article);
  }

  async findAll(query: FindAllArticleRequestQueryDto): Promise<{ items: ArticleModel[]; total: number }> {
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

    return { items, total };
  }

  async update(id: number, dto: UpdateArticleRequestBodyDto, userId: number): Promise<ArticleModel> {
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

  async remove(id: number, userId: number): Promise<boolean> {
    const article = await this.datasource.getRepository(ArticleModel).findOne({ where: { id } });

    if (!article) {
      throw new NotFoundException();
    }

    if (article.authorId !== userId) {
      throw new ForbiddenException('You are not allowed to delete this article');
    }

    await this.datasource.getRepository(ArticleModel).delete(id);

    return true;
  }

  async findOne(id: number): Promise<ArticleModel> {
    const article = await this.datasource.getRepository(ArticleModel).findOne({
      where: { id },
      // TODO: Вот здесь подгружаются все поля author, хотя нужно только id, name. Не разобрался как это ограничить, пароль юзера точно не должен отдаваться
      relations: ['author'],
    });

    if (!article) {
      throw new NotFoundException();
    }

    return article;
  }
}
