import { Module } from '@nestjs/common';
import { PostgresModule } from '../../database/postgres';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';

@Module({
  imports: [PostgresModule],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
