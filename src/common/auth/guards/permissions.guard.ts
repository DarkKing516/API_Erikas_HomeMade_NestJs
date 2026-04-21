import { Injectable, CanActivate, ExecutionContext, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';
import { AuthService } from '../../../modules/config/services/auth.service';

@Injectable()
export class PermissionsGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private authService: AuthService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        // return true; // Descomentar para saltar validación de permisos en desarrollo
        const requiredPermissions = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredPermissions || requiredPermissions.length === 0) {
            return true;
        }

        const { user } = context.switchToHttp().getRequest();
        if (!user || !user.email) {
            throw new UnauthorizedException('No se pudo identificar al usuario. Por favor, inicia sesión de nuevo.');
        }

        // Aquí consultamos los permisos reales del usuario desde el servicio
        const userWithRoles = await this.authService.getUserPermissions(user.email);

        // Extraemos todos los IDs de permisos de todos los roles del usuario
        const userPermissions = userWithRoles.roles.flatMap(role =>
            role.permissions ? role.permissions.map(p => p.id) : []
        );

        const hasPermission = requiredPermissions.every((permission) =>
            userPermissions.includes(permission)
        );

        if (!hasPermission) throw new ForbiddenException('No tienes los permisos necesarios para realizar esta acción');

        return true;
    }
}
