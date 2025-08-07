import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseApi } from 'src/common/dto/response-api.dto';
import { RolService } from '../services/rol.service';
import { Roles } from '../data/entities/roles.entity';
import { CreateRoleDto } from '../data/dto/role/create-role.dto';
import { UpdateRoleDto } from '../data/dto/role/update-role.dto';
import { DeleteRoleDto } from '../data/dto/role/delete-role.dto';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
    constructor(private readonly rolesService: RolService) { }

    @Get('get-all')
    @ApiOperation({ summary: 'Obtener todos los roles' })
    @ApiResponse({ status: 200, description: 'Lista de roles', type: ResponseApi<Roles[]> })
    @ApiResponse({ status: 204, description: 'No hay roles disponibles', type: ResponseApi })
    async getAllRoles(): Promise<ResponseApi<Roles[]>> {
        const roles = await this.rolesService.getAllRoles();
        const statusCode = roles.length > 0 ? 200 : 204;
        const message = roles.length > 0 ? 'Roles obtenidos correctamente' : 'No hay roles disponibles';
        return new ResponseApi<Roles[]>(statusCode, message, roles);
    }

    @Post('create')
    @ApiOperation({ summary: 'Crear un nuevo rol' })
    @ApiResponse({ status: 201, description: 'Rol creado', type: ResponseApi<Roles> })
    @ApiResponse({ status: 409, description: 'El rol ya existe', type: ResponseApi })
    async createRole(@Body() createRoleDto: CreateRoleDto): Promise<ResponseApi<Roles>> {
        const newRole = await this.rolesService.createRole(createRoleDto);
        return new ResponseApi<Roles>(201, 'Rol creado exitosamente', newRole);
    }

    @Put('update')
    @ApiOperation({ summary: 'Actualizar un rol' })
    @ApiResponse({ status: 200, description: 'Rol actualizado correctamente', type: ResponseApi<Roles> })
    @ApiResponse({ status: 404, description: 'Rol no encontrado', type: ResponseApi })
    async updateRole(@Body() updateData: UpdateRoleDto): Promise<ResponseApi<Roles>> {
        const updatedRole = await this.rolesService.updateRole(updateData);
        return new ResponseApi<Roles>(200, 'Rol actualizado correctamente', updatedRole);
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