import { FindAllArticleQueryDto } from '../../modules/article/dto';
import { ArticleModel } from '../postgres/entities';

export const findAllArticlesCachingKey = (query: FindAllArticleQueryDto) => {
  const { authorId, offset, limit, search } = query;

  return `articles-cache-${authorId}-${offset}-${limit}-${search}`;
};

export const findOneArticleCachingKey = (id: ArticleModel['id']) => {
  return `articles-cache-${id}`;
};
