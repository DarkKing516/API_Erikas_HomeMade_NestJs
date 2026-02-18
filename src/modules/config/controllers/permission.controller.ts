import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PermissionService } from '../services/permission.service';
import { CreatePermissionDto } from '../data/dto/permission/create-permission.dto';
import { UpdatePermissionDto } from '../data/dto/permission/update-permission.dto';
import { Permissions } from '../data/entities/permissions.entity';
import { ResponseApi } from 'src/common/dto/response-api.dto';
import { RequirePermissions } from 'src/common/auth/decorators/permissions.decorator';

@ApiTags('Permisos')
@Controller('permissions')
export class PermissionController {
    constructor(private readonly permissionService: PermissionService) { }

    @Get()
    @RequirePermissions('view:config:all-permissions')
    @ApiOperation({ summary: 'Obtener todos los permisos' })
    @ApiResponse({ status: 200, description: 'Lista de permisos obtenida correctamente', type: ResponseApi<Permissions[]> })
    async getAll(): Promise<ResponseApi<Permissions[]>> {
        const permissions = await this.permissionService.getAllPermissions();
        return new ResponseApi(HttpStatus.OK, 'Permisos obtenidos correctamente', permissions);
    }

    @Post()
    @RequirePermissions('create:config:permission')
    @ApiOperation({ summary: 'Crear un nuevo permiso' })
    @ApiResponse({ status: 201, description: 'Permiso creado exitosamente', type: ResponseApi<boolean> })
    async create(@Body() createDto: CreatePermissionDto): Promise<ResponseApi<boolean>> {
        await this.permissionService.createPermission(createDto);
        return new ResponseApi(HttpStatus.CREATED, 'Permiso creado exitosamente', true);
    }

    @Put()
    @RequirePermissions('update:config:permission')
    @ApiOperation({ summary: 'Actualizar un permiso existente' })
    @ApiResponse({ status: 200, description: 'Permiso actualizado exitosamente', type: ResponseApi<boolean> })
    async update(@Body() updateDto: UpdatePermissionDto): Promise<ResponseApi<boolean>> {
        await this.permissionService.updatePermission(updateDto);
        return new ResponseApi(HttpStatus.OK, 'Permiso actualizado exitosamente', true);
    }

    @Delete('all-delete')
    @RequirePermissions('delete:config:all-permissions')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Eliminar TODOS los permisos' })
    @ApiResponse({ status: 200, description: 'Todos los permisos eliminados', type: ResponseApi<boolean> })
    async deleteAll(): Promise<ResponseApi<boolean>> {
        await this.permissionService.deleteAllPermissions();
        return new ResponseApi(HttpStatus.OK, 'Todos los permisos han sido eliminados', true);
    }

    @Post('sync')
    @RequirePermissions('sync:config:permissions')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Sincronizar permisos por defecto' })
    @ApiResponse({ status: 200, description: 'Sincronización completada', type: ResponseApi<boolean> })
    async sync(): Promise<ResponseApi<boolean>> {
        await this.permissionService.syncPermissions();
        return new ResponseApi(HttpStatus.OK, 'Permisos sincronizados correctamente', true);
    }

    @Delete('/:id')
    @RequirePermissions('delete:config:permission')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Eliminar un permiso por ID' })
    @ApiResponse({ status: 200, description: 'Permiso eliminado exitosamente', type: ResponseApi<boolean> })
    async delete(@Param('id') id: string): Promise<ResponseApi<boolean>> {
        const result = await this.permissionService.deletePermission(id);
        return new ResponseApi(HttpStatus.OK, 'Permiso eliminado exitosamente', result);
    }
}
