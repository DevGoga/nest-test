import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostgresModule } from './database/postgres';

@Module({
  imports: [PostgresModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
