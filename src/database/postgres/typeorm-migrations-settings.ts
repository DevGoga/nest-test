import { DataSource, DataSourceOptions } from 'typeorm';
import appConfig from '../../config';
import * as entitiesObject from './entities';

export const entities = Object.values(entitiesObject);

const options: DataSourceOptions = {
  migrations: ['src/database/postgres/migrations/**/*.ts'],
  migrationsTableName: '_migrations',
  host: appConfig.postgres.host,
  port: appConfig.postgres.port,
  username: appConfig.postgres.username,
  password: appConfig.postgres.password,
  database: appConfig.postgres.database,
  type: 'postgres',
  synchronize: false,
  entities,
};

export default new DataSource(options);
