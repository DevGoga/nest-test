import 'reflect-metadata';
import { Provider } from '@nestjs/common';
import { DataSource } from 'typeorm';
import appConfig from '../../config';
import { Articles, Users } from './entity';

export const DATASOURCE = 'DataSource';

export const dataSourceProvider: Provider<DataSource> = {
  provide: DATASOURCE,
  useFactory: async (): Promise<DataSource> => {
    const appDataSource = new DataSource({
      type: 'postgres',
      host: appConfig.postgres.host,
      port: appConfig.postgres.port,
      username: appConfig.postgres.username,
      password: appConfig.postgres.password,
      database: appConfig.postgres.database,
      entities: [Users, Articles],
      migrations: [],
      synchronize: true,
      logging: false,
    });

    await appDataSource
      .initialize()
      .then(() => console.log('TypeORM successful connect'))
      .catch((error) => console.log(error));

    return appDataSource;
  },
};
