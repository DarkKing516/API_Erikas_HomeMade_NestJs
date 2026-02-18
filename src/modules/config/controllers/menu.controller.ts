import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseApi } from 'src/common/dto/response-api.dto';
import { MenuService } from '../services/menu.service';
import { MenuEntity } from '../data/entities/menu.entity';
import { CreateMenuDto } from '../data/dto/menu/create-menu.dto';
import { UpdateMenuDto } from '../data/dto/menu/update-menu.dto';
import { RequirePermissions } from 'src/common/auth/decorators/permissions.decorator';

@ApiTags('Menús')
@Controller('menus')
export class MenuController {
  constructor(private readonly menuService: MenuService) { }

  @Get('get-menu')
  @RequirePermissions('view:config:menus')
  @ApiOperation({ summary: 'Obtener todos los menús' })
  @ApiResponse({ status: 200, description: 'Lista de menús obtenida correctamente', type: ResponseApi<MenuEntity[]> })
  async getAll(): Promise<ResponseApi<MenuEntity[]>> {
    const menus = await this.menuService.getAllMenus();
    return new ResponseApi(HttpStatus.OK, 'Menús obtenidos correctamente', menus);
  }

  @Post('create-menu')
  @RequirePermissions('create:config:menu')
  @ApiOperation({ summary: 'Crear un nuevo menú' })
  @ApiResponse({ status: 201, description: 'Menú creado exitosamente', type: ResponseApi<boolean>, })
  async create(@Body() createDto: CreateMenuDto,): Promise<ResponseApi<boolean>> {
    await this.menuService.createMenu(createDto);
    return new ResponseApi(HttpStatus.CREATED, 'Menú creado exitosamente', true);
  }

  @Put('update-menu')
  @RequirePermissions('update:config:menu')
  @ApiOperation({ summary: 'Actualizar un menú existente' })
  @ApiResponse({ status: 200, description: 'Menú actualizado exitosamente', type: ResponseApi<boolean> })
  async update(@Body() updateDto: UpdateMenuDto,): Promise<ResponseApi<boolean>> {
    await this.menuService.updateMenu(updateDto);
    return new ResponseApi(HttpStatus.OK, 'Menú actualizado exitosamente', true);
  }

  @Delete(':id')
  @RequirePermissions('delete:config:menu')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Eliminar un menú por ID' })
  @ApiResponse({ status: 200, description: 'Menú eliminado exitosamente', type: ResponseApi<boolean>, })
  async delete(@Param('id') id: string): Promise<ResponseApi<boolean>> {
    const result = await this.menuService.deleteMenu(id);
    return new ResponseApi(HttpStatus.OK, 'Menú eliminado exitosamente', result);
  }
}
