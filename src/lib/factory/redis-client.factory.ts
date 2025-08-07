import { FactoryProvider } from '@nestjs/common';
import { createClient } from 'redis';
import * as process from "node:process";
import { REDIS_CLIENT, RedisClient } from '../const/redis';

export const redisClientFactory: FactoryProvider<Promise<RedisClient>> = {
  provide: REDIS_CLIENT,
  useFactory: async () => {
    const redisUrl = process.env.REDIS_URL || `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`;
    const client = createClient({
      url: redisUrl,
      // Si usas Upstash con TLS, asegúrate de que en tu URL esté el esquema rediss://
      // o configura `socket: { tls: true }` si usas host/port
    });
    client.on('error', (err) => console.error('[Redis] error', err));
    await client.connect();
    console.log('[Redis] Cliente conectado');
    return client;
  },
};
