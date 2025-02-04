// src/roles/roles.controller.ts
import { Controller, Get, Post, Body, Query, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './dto/role.dto';
import { ResponseApi } from 'src/common/dto/response-api.dto';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
    constructor(private readonly rolesService: RolesService) { }

    @Get('GetRoles')
    @ApiOperation({ summary: 'Obtener todos los roles' })
    @ApiResponse({ status: 200, description: 'Lista de roles', type: ResponseApi<Role[]> })
    @ApiResponse({ status: 204, description: 'No hay roles disponibles', type: ResponseApi })
    @ApiResponse({ status: 500, description: 'Fallo inesperado en la base de datos', type: ResponseApi })
    async getAllRoles(): Promise<ResponseApi<Role[]>> {
        try {
            const roles = await this.rolesService.getAllRoles();
            const statusCode = roles.length > 0 ? 200 : 204;
            const message = roles.length > 0 ? 'Roles obtenidos correctamente' : 'No hay roles disponibles';
            return new ResponseApi<Role[]>(statusCode, message, roles);
        } catch (exp) {
            throw new HttpException(new ResponseApi(500, 'Error interno del servidor'), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('CreateRole')
    @ApiOperation({ summary: 'Crear un nuevo rol' })
    @ApiResponse({ status: 201, description: 'Rol creado', type: ResponseApi<Role[]> })
    @ApiResponse({ status: 500, description: 'Fallo inesperado en la base de datos', type: ResponseApi })
    async createRole(@Body() createRoleDto: CreateRoleDto): Promise<ResponseApi<Role>> {
        const newRole = await this.rolesService.createRole(createRoleDto);
        return new ResponseApi<Role>(201, 'Rol creado exitosamente', newRole);
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
    @ApiResponse({ status: 200, description: 'Rol encontrado', type: ResponseApi<Role> })
    @ApiResponse({ status: 404, description: 'Rol no encontrado', type: ResponseApi })
    @ApiResponse({ status: 500, description: 'Fallo inesperado en la base de datos', type: ResponseApi })
    async getRolesByName(@Query('name') name: string): Promise<ResponseApi<Role>> {
        try {
            const role = await this.rolesService.getRoleByName(name);
            return role ? new ResponseApi<Role>(200, 'Rol encontrado', role)
                : new ResponseApi<Role>(404, 'Rol no encontrado', null);
        } catch (exp) {
            throw new HttpException(new ResponseApi(500, 'Error interno del servidor'), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}