import {Body, Controller, Get, HttpStatus, Param, Post, Patch} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {UserService} from '../services/user.service';
import {ResponseApi} from 'src/common/dto/response-api.dto';
import {Users} from '../data/entities/users.entity';
import {ReturnUserDto} from '../data/dto/user/return-user.dto';
import {CreateUserDto} from '../data/dto/user/create-user.dto';
import {UpdateUserDto} from '../data/dto/user/update-user.dto';
import {UpdateUserRoleDto} from '../data/dto/user/update-user-role.dto';
import {RequirePermissions} from 'src/common/auth/decorators/permissions.decorator';

@ApiTags('Usuarios')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  @RequirePermissions('view:config:users')
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiResponse({ status: 200, description: 'Lista de usuarios obtenida correctamente', type: ResponseApi<Users[]>, })
  async getAll(): Promise<ResponseApi<Users[]>> {
    const users = await this.userService.getAll();
    return new ResponseApi(HttpStatus.OK, 'Usuarios obtenidos correctamente', users,);
  }

  @Get('users-with-role')
  @RequirePermissions('view:config:users')
  @ApiOperation({ summary: 'Obtener todos los usuarios con sus roles' })
  @ApiResponse({ status: 200, description: 'Lista de usuarios obtenida correctamente', type: ResponseApi<ReturnUserDto[]>, })
  async getAllWithRoles(): Promise<ResponseApi<ReturnUserDto[]>> {
    const users = await this.userService.getAllWithRoles();
    return new ResponseApi(HttpStatus.OK, 'Usuarios obtenidos correctamente', users,);
  }

  @Get(':id')
  @RequirePermissions('view:config:user-detail')
  @ApiOperation({ summary: 'Obtener usuario con sus roles por ID' })
  @ApiResponse({ status: 200, description: 'Usuario con roles obtenido correctamente', type: ResponseApi<ReturnUserDto>, })
  async getUserWithRoles(@Param('id') id: string,): Promise<ResponseApi<ReturnUserDto>> {
    const userWithRoles = await this.userService.getUserWithRoles(id);
    return new ResponseApi(HttpStatus.OK, 'Usuario obtenido correctamente', userWithRoles,);
  }

  // @Public()
  @Post('create-user')
  @RequirePermissions('create:config:user')
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  @ApiResponse({ status: 201, description: 'Usuario creado exitosamente', type: ResponseApi<boolean>, })
  async create(@Body() createUserDto: CreateUserDto,): Promise<ResponseApi<boolean>> {
    await this.userService.createUser(createUserDto);
    return new ResponseApi(HttpStatus.CREATED, 'Usuario creado exitosamente', true,);
  }

  @Patch(':id/profile')
  @RequirePermissions('update:config:user')
  @ApiOperation({ summary: 'Actualizar perfil de usuario' })
  @ApiResponse({ status: 200, description: 'Usuario actualizado exitosamente', type: ResponseApi<ReturnUserDto>, })
  async updateProfile(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ResponseApi<ReturnUserDto>> {
    const updatedUser = await this.userService.updateProfile(id, updateUserDto);
    return new ResponseApi(HttpStatus.OK, 'Usuario actualizado exitosamente', updatedUser);
  }

  @Patch(':id/role')
  @RequirePermissions('update:config:user')
  @ApiOperation({ summary: 'Actualizar rol de usuario' })
  @ApiResponse({ status: 200, description: 'Rol de usuario actualizado exitosamente', type: ResponseApi<ReturnUserDto>, })
  async updateRole(
    @Param('id') id: string,
    @Body() updateUserRoleDto: UpdateUserRoleDto,
  ): Promise<ResponseApi<ReturnUserDto>> {
    const updatedUser = await this.userService.updateRole(id, updateUserRoleDto);
    return new ResponseApi(HttpStatus.OK, 'Rol de usuario actualizado exitosamente', updatedUser);
  }
}
