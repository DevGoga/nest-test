import { Module } from '@nestjs/common';
import { PostgresModule } from './database/postgres';
import { RedisModule } from './database/redis/redis.module';
import { HealthCheckModule } from './health-check/health-check.module';
import { ArticleModule } from './modules/article/article.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [HealthCheckModule, PostgresModule, RedisModule, UserModule, ArticleModule, AuthModule],
})
export class AppModule {}
