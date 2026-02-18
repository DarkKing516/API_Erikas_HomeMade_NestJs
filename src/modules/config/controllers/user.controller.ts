import {Body, Controller, Get, HttpStatus, Param, Post} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {UserService} from '../services/user.service';
import {ResponseApi} from 'src/common/dto/response-api.dto';
import {Users} from '../data/entities/users.entity';
import {ReturnUserDto} from '../data/dto/user/return-user.dto';
import {CreateUserDto} from '../data/dto/user/create-user.dto';
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
}
