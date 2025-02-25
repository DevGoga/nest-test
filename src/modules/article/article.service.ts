import { Injectable } from '@nestjs/common';
import { FindAllArticleQueryDto } from './dto';

@Injectable()
export class ArticleService {
  public async findAll(query: FindAllArticleQueryDto) {
    return query;
  }
}
