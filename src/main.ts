import { ShutdownSignal } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { APP_NAME, APP_VERSION } from './app.constants';
import { AppModule } from './app.module';
import { bootstrapPipes, bootstrapSwagger } from './bootstrap';
import appConfig from './config';
import { ExceptionFilter } from './filters/exception-filter';
import { developmentStrategy, PinoService, productionStrategy } from './logger';

async function bootstrap() {
  const pinoStrategy = process.env.NODE_ENV === 'development' ? developmentStrategy : productionStrategy;
  const logger = new PinoService(pinoStrategy);

  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), { logger });

  app.enableShutdownHooks([ShutdownSignal.SIGINT, ShutdownSignal.SIGTERM]);

  bootstrapSwagger(app);
  bootstrapPipes(app);

  app.useGlobalFilters(new ExceptionFilter());

  await app.listen(appConfig.port);

  const context = 'Bootstrap';
  logger.log(`Listening on ${JSON.stringify(app.getHttpServer().address())}`, context);
  logger.log(`Application "${APP_NAME}" version ${APP_VERSION} has started`, context);
}

bootstrap();
