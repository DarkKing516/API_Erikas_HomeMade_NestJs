import { Module } from '@nestjs/common';
import { RolesController } from './controllers/roles.controller';
import { RolService } from './services/rol.service';
import { UserService } from './services/user.service';
import { redisClientFactory } from '../../lib/factory/redis-client.factory';
import { RedisService } from '../../lib/services/redis.service';

@Module({
  controllers : [RolesController],
  providers   : [RolService, UserService, redisClientFactory, RedisService],
})
export class ConfigModule {}
