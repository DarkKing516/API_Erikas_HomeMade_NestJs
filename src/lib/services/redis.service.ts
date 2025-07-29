import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common';
import { RedisClientType } from 'redis';
import { REDIS_CLIENT, RedisClient } from '../const/redis';

@Injectable()
export class RedisService implements OnModuleDestroy {
  public constructor(
    @Inject(REDIS_CLIENT) private readonly redis: RedisClient,
  ) {}

  async onModuleDestroy(): Promise<void> {
    await this.redis.quit();
  }

  async ping(): Promise<string> {
    return await this.redis.ping();
  }

  getClient(): RedisClientType<any, any, any> {
    return this.redis;
  }

  async setBase(key: string, value: string): Promise<void> {
    await this.redis.set(`${key}`, value);
  }

  async set(key: string, value: string): Promise<void> {
    await this.redis.set(`${key}`, value);
  }

  async get(key: string): Promise<string | null> {
    return this.redis.get(`${key}`);
  }

  async del(key: string): Promise<void> {
    await this.redis.del(`${key}`);
  }
}
