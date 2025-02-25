import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType, SetOptions } from '@redis/client';
import { REDIS } from './redis.constants';

@Injectable()
export class RedisService {
  constructor(
    @Inject(REDIS)
    private readonly redis: RedisClientType,
  ) {}

  async set(key: string, value: Record<string, any>, options?: SetOptions) {
    const json = JSON.stringify(value);

    return this.redis.set(key, json, options);
  }

  async get<T extends Record<string, any>>(key: string): Promise<T | null> {
    const value = await this.redis.get(key);

    if (value === null) {
      return null;
    }

    return JSON.parse(value);
  }

  async delete(key: string) {
    return await this.redis.del(key);
  }
}
