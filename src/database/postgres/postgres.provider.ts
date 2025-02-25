import 'reflect-metadata';
import { Logger, Provider } from '@nestjs/common';
import { DataSource } from 'typeorm';
import appConfig from '../../config';
import { Article, User } from './entity';
import { POSTGRES } from './postgres.constants';

export const postgresProvider: Provider<DataSource> = {
  provide: POSTGRES,
  useFactory: async (): Promise<DataSource> => {
    const logger = new Logger('Postgres Provider');

    const appDataSource = new DataSource({
      type: 'postgres',
      host: appConfig.postgres.host,
      port: appConfig.postgres.port,
      username: appConfig.postgres.username,
      password: appConfig.postgres.password,
      database: appConfig.postgres.database,
      entities: [User, Article],
      logging: false,
    });

    await appDataSource.initialize();

    logger.log('TypeORM successfully connected');

    return appDataSource;
  },
};
