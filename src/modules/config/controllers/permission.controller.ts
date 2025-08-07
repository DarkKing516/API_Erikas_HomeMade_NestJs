import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put,} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {PermissionService} from '../services/permission.service';
import {CreatePermissionDto} from '../data/dto/permission/create-permission.dto';
import {UpdatePermissionDto} from '../data/dto/permission/update-permission.dto';
import {Permissions} from '../data/entities/permissions.entity';
import {ResponseApi} from 'src/common/dto/response-api.dto';

@ApiTags('Permisos')
@Controller('permissions')
export class PermissionController {
    constructor(private readonly permissionService: PermissionService) {}

    @Get()
    @ApiOperation({ summary: 'Obtener todos los permisos' })
    @ApiResponse({status: 200, description: 'Lista de permisos obtenida correctamente', type: ResponseApi<Permissions[]>,})
    async getAll(): Promise<ResponseApi<Permissions[]>> {
        const permissions = await this.permissionService.getAllPermissions();
        return new ResponseApi(HttpStatus.OK, 'Permisos obtenidos correctamente', permissions);
    }

    @Post()
    @ApiOperation({ summary: 'Crear un nuevo permiso' })
    @ApiResponse({status: 201, description: 'Permiso creado exitosamente', type: ResponseApi<boolean>,})
    async create(@Body() createDto: CreatePermissionDto,): Promise<ResponseApi<boolean>> {
        await this.permissionService.createPermission(createDto);
        return new ResponseApi(HttpStatus.CREATED, 'Permiso creado exitosamente', true);
    }

    @Put()
    @ApiOperation({ summary: 'Actualizar un permiso existente' })
    @ApiResponse({status: 200, description: 'Permiso actualizado exitosamente', type: ResponseApi<boolean>,})
    async update(@Body() updateDto: UpdatePermissionDto,): Promise<ResponseApi<boolean>> {
        await this.permissionService.updatePermission(updateDto);
        return new ResponseApi(HttpStatus.OK, 'Permiso actualizado exitosamente', true);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Eliminar un permiso por ID' })
    @ApiResponse({status: 200, description: 'Permiso eliminado exitosamente', type: ResponseApi<boolean>,})
    async delete(@Param('id') id: string): Promise<ResponseApi<boolean>> {
        const result = await this.permissionService.deletePermission(id);
        return new ResponseApi(HttpStatus.OK, 'Permiso eliminado exitosamente', result);
    }
}
