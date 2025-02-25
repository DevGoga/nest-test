import { Module } from '@nestjs/common';
import { PostgresModule } from './database/postgres';
import { RedisModule } from './database/redis/redis.module';
import { ArticleModule } from './modules/article/article.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [PostgresModule, RedisModule, UserModule, ArticleModule],
})
export class AppModule {}
