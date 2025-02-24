import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app/app.module';
import { bootstrapPipes, bootstrapSwagger } from './bootstrap';
import appConfig from './config';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  bootstrapSwagger(app);
  bootstrapPipes(app);

  await app.listen(appConfig.port, () => console.log(`Server start on port ${appConfig.port}`));
}

bootstrap();
