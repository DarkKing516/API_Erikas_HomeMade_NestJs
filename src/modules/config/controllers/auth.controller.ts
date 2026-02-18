import {Body, Controller, HttpStatus, Post} from '@nestjs/common';
import {ApiOperation, ApiTags} from '@nestjs/swagger';
import {ResponseApi} from 'src/common/dto/response-api.dto';
import {ReturnUserDto} from '../data/dto/user/return-user.dto';
import {AuthService} from "../services/auth.service";
import {LoginUserDto} from "../data/dto/login-user.dto";
import {Public} from 'src/common/auth/decorators/public.decorator';

@ApiTags('Autenticación')
@Controller('auth')
@Public()
export class AuthController {
  constructor(private readonly service: AuthService) { }

  @Post('login-user')
  @ApiOperation({ summary: 'Verificar correo y contraseña' })
  async login(@Body() createUserDto: LoginUserDto): Promise<ResponseApi<{ user: ReturnUserDto, accessToken: string }>> {
    const result = await this.service.login(createUserDto);
    return new ResponseApi(HttpStatus.CREATED, 'Login exitoso', result);
  }
}
