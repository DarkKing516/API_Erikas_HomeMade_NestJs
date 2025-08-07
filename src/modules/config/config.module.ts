import { Module } from '@nestjs/common';
import { RolesController } from './controllers/roles.controller';
import { RolService } from './services/rol.service';
import { UserService } from './services/user.service';
import { redisClientFactory } from '../../lib/factory/redis-client.factory';
import { RedisService } from '../../lib/services/redis.service';
import {PermissionController} from "./controllers/permission.controller";
import {PermissionService} from "./services/permission.service";

@Module({
  controllers : [RolesController, PermissionController],
  providers   : [RolService, UserService, PermissionService, redisClientFactory, RedisService],
})
export class ConfigModule {}
