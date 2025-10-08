import {Body, Controller, Delete, Get, Param, Post, Put,} from "@nestjs/common";
import {ApiOkResponse, ApiOperation, ApiResponse, ApiTags,} from "@nestjs/swagger";
import {ResponseApi} from 'src/common/dto/response-api.dto';
import {RolService} from '../services/rol.service';
import {Roles} from '../data/entities/roles.entity';
import {CreateRoleDto} from '../data/dto/role/create-role.dto';
import {UpdateRoleDto} from '../data/dto/role/update-role.dto';
import {ReturnRoleDto} from '../data/dto/role/return-role.dto';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolService) {}

  @Get('get-all')
  @ApiOperation({summary: 'Obtener todos los roles'})
  @ApiResponse({status: 200, description: 'Lista de roles', type: ResponseApi<ReturnRoleDto[]>})
  @ApiResponse({status: 204, description: 'No hay roles disponibles', type: ResponseApi})
  async getAllRoles(): Promise<ResponseApi<ReturnRoleDto[]>> {
    const roles = await this.rolesService.getAllRoles();
    const statusCode = roles.length > 0 ? 200 : 204;
    const message = roles.length > 0 ? 'Roles obtenidos correctamente' : 'No hay roles disponibles';
    return new ResponseApi<ReturnRoleDto[]>(statusCode, message, roles);
  }

  @Post('create')
  @ApiOperation({summary: 'Crear un nuevo rol'})
  @ApiResponse({status: 201, description: 'Rol creado', type: ResponseApi<Roles>})
  @ApiResponse({status: 409, description: 'El rol ya existe', type: ResponseApi})
  async createRole(@Body() createRoleDto: CreateRoleDto): Promise<ResponseApi<boolean>> {
    const newRole = await this.rolesService.createRole(createRoleDto);
    return new ResponseApi<boolean>(201, 'Rol creado exitosamente', newRole);
  }

  @Put('update')
  @ApiOperation({summary: 'Actualizar un rol'})
  @ApiResponse({status: 200, description: 'Rol actualizado correctamente', type: ResponseApi<boolean>})
  @ApiResponse({status: 404, description: 'Rol no encontrado', type: ResponseApi})
  async updateRole(@Body() updateData: UpdateRoleDto): Promise<ResponseApi<boolean>> {
    const updatedRole = await this.rolesService.updateRole(updateData);
    return new ResponseApi<boolean>(200, 'Rol actualizado correctamente', updatedRole);
  }

  @Delete(':id')
  @ApiOkResponse({example: true})
  @ApiOperation({summary: 'Eliminar un rol'})
  async delete(@Param("id") id: string): Promise<ResponseApi<boolean>> {
    const deleted = await this.rolesService.deleteRole(id);
    return new ResponseApi<boolean>(200, 'Rol eliminado correctamente', deleted);
  }
}