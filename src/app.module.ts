import { Module } from '@nestjs/common';
import { PostgresModule } from './database/postgres';
import { ArticleModule } from './modules/article/article.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [PostgresModule, UserModule, ArticleModule],
})
export class AppModule {}
