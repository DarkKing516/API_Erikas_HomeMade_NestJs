import { Controller, Get, Post, Body, Query, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { ResponseApi } from 'src/common/dto/response-api.dto';
import { RolService } from '../services/rol.service';
import { RolesEntity } from '../data/entities/roles.entity';
import { CreateRoleDto } from '../data/dto/role/create-role.dto';
import { UpdateRoleDto } from '../data/dto/role/update-role.dto';
import { DeleteRoleDto } from '../data/dto/role/delete-role.dto';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
    constructor(private readonly rolesService: RolService) { }

    @Get('get-all')
    @ApiOperation({ summary: 'Obtener todos los roles' })
    @ApiResponse({ status: 200, description: 'Lista de roles', type: ResponseApi<RolesEntity[]> })
    @ApiResponse({ status: 204, description: 'No hay roles disponibles', type: ResponseApi })
    async getAllRoles(): Promise<ResponseApi<RolesEntity[]>> {
        const roles = await this.rolesService.getAllRoles();
        const statusCode = roles.length > 0 ? 200 : 204;
        const message = roles.length > 0 ? 'Roles obtenidos correctamente' : 'No hay roles disponibles';
        return new ResponseApi<RolesEntity[]>(statusCode, message, roles);
    }

    @Post('create')
    @ApiOperation({ summary: 'Crear un nuevo rol' })
    @ApiResponse({ status: 201, description: 'Rol creado', type: ResponseApi<RolesEntity> })
    @ApiResponse({ status: 409, description: 'El rol ya existe', type: ResponseApi })
    async createRole(@Body() createRoleDto: CreateRoleDto): Promise<ResponseApi<RolesEntity>> {
        const newRole = await this.rolesService.createRole(createRoleDto);
        return new ResponseApi<RolesEntity>(201, 'Rol creado exitosamente', newRole);
    }

    @Get('search')
    @ApiOperation({ summary: 'Obtener roles filtrados por nombre' })
    @ApiQuery({ name: 'name', required: true, type: String, description: 'Filtra los roles por nombre', example: 'Admin' })
    @ApiResponse({ status: 200, description: 'Rol encontrado', type: ResponseApi<RolesEntity> })
    @ApiResponse({ status: 404, description: 'Rol no encontrado', type: ResponseApi })
    async getRolesByName(@Query('name') name: string): Promise<ResponseApi<RolesEntity>> {
        const role = await this.rolesService.getRoleByNameWithConverter(name);
        return new ResponseApi<RolesEntity>(200, 'Rol encontrado', role);
    }

    @Put('update')
    @ApiOperation({ summary: 'Actualizar un rol' })
    @ApiResponse({ status: 200, description: 'Rol actualizado correctamente', type: ResponseApi<RolesEntity> })
    @ApiResponse({ status: 404, description: 'Rol no encontrado', type: ResponseApi })
    async updateRole(@Body() updateData: UpdateRoleDto): Promise<ResponseApi<RolesEntity>> {
        const updatedRole = await this.rolesService.updateRole(updateData);
        return new ResponseApi<RolesEntity>(200, 'Rol actualizado correctamente', updatedRole);
    }

    @Delete('delete')
    @ApiOperation({ summary: 'Eliminar un rol' })
    @ApiResponse({ status: 200, description: 'Rol eliminado correctamente', type: ResponseApi<boolean> })
    @ApiResponse({ status: 404, description: 'Rol no encontrado', type: ResponseApi })
    async deleteRole(@Body() id: DeleteRoleDto): Promise<ResponseApi<boolean>> {
        const deleted = await this.rolesService.deleteRole(id);
        return new ResponseApi<boolean>(200, 'Rol eliminado correctamente', deleted);
    }

}