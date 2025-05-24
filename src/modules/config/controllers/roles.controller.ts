import { Controller, Get, Post, Body, Query, HttpException, HttpStatus, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { ResponseApi } from 'src/common/dto/response-api.dto';
import { RolService } from '../services/rol.service';
import { RolesEntity } from '../data/entities/roles.entity';
import { CreateRoleDto } from '../data/dto/create-role.dto';
import { UpdateRoleDto } from '../data/dto/update-role.dto';
import { DeleteRoleDto } from '../data/dto/delete-role.dto';

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
    @ApiOperation({ summary: 'Crear un nuevo roles' })
    @ApiResponse({ status: 201, description: 'Rol creado', type: ResponseApi<RolesEntity[]> })
    @ApiResponse({ status: 409, description: 'El roles ya existe', type: ResponseApi })
    async createRole(@Body() createRoleDto: CreateRoleDto): Promise<ResponseApi<RolesEntity>> {
        const newRole = await this.rolesService.createRole(createRoleDto);
        if (!newRole) {
            throw new HttpException(
              new ResponseApi(409, 'El roles ya existe'),
              HttpStatus.CONFLICT
            );
        }
        return new ResponseApi<RolesEntity>(201, 'Rol creado exitosamente', newRole);
    }

    @Get('search')
    @ApiOperation({ summary: 'Obtener roles filtrados por nombre' })
    @ApiQuery({
        name: 'name',
        required: true,
        type: String,
        description: 'Filtra los roles por nombre',
        example: 'Admin',
    })
    @ApiResponse({ status: 200, description: 'Rol encontrado', type: ResponseApi<RolesEntity> })
    @ApiResponse({ status: 404, description: 'Rol no encontrado', type: ResponseApi })
    async getRolesByName(@Query('name') name: string): Promise<ResponseApi<RolesEntity>> {
        const role = await this.rolesService.getRoleByName(name);
        if (!role) {
            throw new HttpException(new ResponseApi(404, 'Rol no encontrado'), HttpStatus.NOT_FOUND);
        }
        return new ResponseApi<RolesEntity>(200, 'Rol encontrado', role);
    }

    @Put('update')
    @ApiOperation({ summary: 'Actualizar un roles' })
    @ApiResponse({ status: 200, description: 'Rol actualizado correctamente', type: ResponseApi<RolesEntity> })
    @ApiResponse({ status: 404, description: 'Rol no encontrado', type: ResponseApi })
    async updateRole(@Body() updateData: UpdateRoleDto): Promise<ResponseApi<RolesEntity>> {
        const updatedRole = await this.rolesService.updateRole(updateData);
        if (!updatedRole) {
            throw new HttpException(new ResponseApi(404, 'Rol no encontrado'), HttpStatus.NOT_FOUND);
        }
        return new ResponseApi<RolesEntity>(200, 'Rol actualizado correctamente', updatedRole);
    }

    @Delete('delete')
    @ApiOperation({ summary: 'Eliminar un roles' })
    @ApiResponse({ status: 200, description: 'Rol eliminado correctamente', type: ResponseApi })
    @ApiResponse({ status: 404, description: 'Rol no encontrado', type: ResponseApi })
    async deleteRole(@Body() id: DeleteRoleDto): Promise<ResponseApi<null>> {
        const deleted = await this.rolesService.deleteRole(id);
        if (!deleted) {
            throw new HttpException(new ResponseApi(404, 'Rol no encontrado'), HttpStatus.NOT_FOUND);
        }
        return new ResponseApi<null>(200, 'Rol eliminado correctamente', null);
    }

}