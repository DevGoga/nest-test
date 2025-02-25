import { Inject, Injectable } from '@nestjs/common';
import { DataSource, FindOptionsWhere, ILike } from 'typeorm';
import { ArticleModel } from '../../database/postgres/entities';
import { POSTGRES } from '../../database/postgres/postgres.constants';
import { FindAllArticleQueryDto } from './dto';

@Injectable()
export class ArticleService {
  constructor(@Inject(POSTGRES) private readonly datasource: DataSource) {}

  public async findAll(query: FindAllArticleQueryDto) {
    const { limit, offset, authorId, search } = query;

    const where: FindOptionsWhere<ArticleModel> = {};

    // if (authorId) {
    //   where.authorId = authorId;
    // }

    if (search) {
      where.title = ILike(`%${search}%`);
    }

    const [items, total] = await this.datasource.getRepository(ArticleModel).findAndCount({});
  }
}
