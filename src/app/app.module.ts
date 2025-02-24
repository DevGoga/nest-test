import { Module } from '@nestjs/common';
import { PostgresModule } from '../database/postgres';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [PostgresModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
