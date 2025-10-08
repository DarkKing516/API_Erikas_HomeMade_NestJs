import { Module } from '@nestjs/common';
import { RolesController } from './controllers/roles.controller';
import { RolService } from './services/rol.service';
import { UserService } from './services/user.service';
import { redisClientFactory } from '../../lib/factory/redis-client.factory';
import { RedisService } from '../../lib/services/redis.service';
import {PermissionController} from "./controllers/permission.controller";
import {PermissionService} from "./services/permission.service";
import { UserController } from './controllers/user.controller';
import { MenuController } from './controllers/menu.controller';
import { MenuService } from './services/menu.service';

@Module({
  controllers : [RolesController, PermissionController, UserController, MenuController],
  providers   : [RolService, PermissionService, UserService, MenuService, redisClientFactory, RedisService],
})
export class ConfigModule {}
