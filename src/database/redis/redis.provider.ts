import { Logger, Provider } from '@nestjs/common';
import { createClient } from 'redis';
import appConfig from '../../config';
import { REDIS } from './redis.constants';

export const redisProvider: Provider = {
  provide: REDIS,
  useFactory: async () => {
    const client = createClient({ url: appConfig.redisConnectionString });
    await client.connect();

    const logger = new Logger('Redis Provider');

    logger.log('Redis successfully connected');

    return client;
  },
};
