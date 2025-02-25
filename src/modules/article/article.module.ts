import { Module } from '@nestjs/common';
import { PostgresModule } from '../../database/postgres';
import { UserModule } from '../user/user.module';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';

@Module({
  imports: [PostgresModule, UserModule],
  controllers: [ArticleController],
  providers: [ArticleService],
  exports: [ArticleService],
})
export class ArticleModule {}
