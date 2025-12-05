import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { ResponseApi } from 'src/common/dto/response-api.dto';
import { Users } from '../data/entities/users.entity';
import { ReturnUserDto } from '../data/dto/user/return-user.dto';
import { CreateUserDto } from '../data/dto/user/create-user.dto';
import {AuthService} from "../services/auth.service";
import {LoginUserDto} from "../data/dto/login-user.dto";

@ApiTags('Autenticación')
@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('login-user')
  @ApiOperation({ summary: 'Verificar correo y contraseña' })
  async create(@Body() createUserDto: LoginUserDto,): Promise<ResponseApi<boolean>> {
    await this.service.login(createUserDto);
    return new ResponseApi(HttpStatus.CREATED, 'Usuario creado exitosamente', true,);
  }

}
