import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';

@Module({
  imports: [UserModule],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
