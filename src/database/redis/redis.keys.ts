import { FindAllArticleQueryDto } from '../../modules/article/dto';

export const redisArticlesCachingKey = (query: FindAllArticleQueryDto) => {
  const { authorId, offset, limit, search } = query;

  return `articles-cache-${authorId}-${offset}-${limit}-${search}`;
};
