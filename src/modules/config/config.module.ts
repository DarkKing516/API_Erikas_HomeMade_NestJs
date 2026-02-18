import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { RolesController } from "./controllers/roles.controller";
import { RolService } from "./services/rol.service";
import { UserService } from "./services/user.service";
import { PermissionController } from "./controllers/permission.controller";
import { PermissionService } from "./services/permission.service";
import { UserController } from "./controllers/user.controller";
import { MenuController } from "./controllers/menu.controller";
import { MenuService } from "./services/menu.service";
import { AuthService } from "./services/auth.service";
import { AuthController } from "./controllers/auth.controller";
import { JwtStrategy } from "../../common/auth/strategies/jwt.strategy";
import { JwtAuthGuard } from "../../common/auth/guards/jwt-auth.guard";
import { PermissionsGuard } from "../../common/auth/guards/permissions.guard";

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'TEMPORARY_SECRET_KEY_CHANGE_ME',
            signOptions: { expiresIn: '1h' },
        }),
    ],
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
        MenuService,
        JwtStrategy,
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
        {
            provide: APP_GUARD,
            useClass: PermissionsGuard,
        },
    ],
})
export class ConfigModule { }
