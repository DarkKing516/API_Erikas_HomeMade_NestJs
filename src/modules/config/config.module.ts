import {Module} from "@nestjs/common";
import {RolesController} from "./controllers/roles.controller";
import {RolService} from "./services/rol.service";
import {UserService} from "./services/user.service";
import {PermissionController} from "./controllers/permission.controller";
import {PermissionService} from "./services/permission.service";
import {UserController} from "./controllers/user.controller";
import {MenuController} from "./controllers/menu.controller";
import {MenuService} from "./services/menu.service";
import {AuthService} from "./services/auth.service";
import {AuthController} from "./controllers/auth.controller";

@Module({
    controllers: [
        RolesController,
        PermissionController,
        UserController,
        MenuController,
        AuthController,
    ],
    providers: [
        RolService,
        PermissionService,
        UserService,
        AuthService,
        MenuService /*redisClientFactory, RedisService,*/,
    ],
})
export class ConfigModule {}
