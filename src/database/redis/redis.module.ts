import { Global, Inject, Logger, Module, OnApplicationShutdown } from '@nestjs/common';
import { RedisClientType } from '@redis/client';
import { REDIS } from './redis.constants';
import { redisProvider } from './redis.provider';
import { RedisService } from './redis.service';

@Global()
@Module({
  providers: [RedisService, redisProvider],
  exports: [RedisService],
})
export class RedisModule implements OnApplicationShutdown {
  private readonly logger = new Logger(RedisModule.name);

  constructor(
    @Inject(REDIS)
    private readonly redis: RedisClientType,
  ) {}

  async onApplicationShutdown(): Promise<void> {
    await this.redis.disconnect();

    this.logger.log(`Redis connection destroyed`);
  }
}
