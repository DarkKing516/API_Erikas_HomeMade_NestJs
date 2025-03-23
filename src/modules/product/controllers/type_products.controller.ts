import { Controller, Get, Post, Body, HttpException, HttpStatus, Put, Delete, Param } from '@nestjs/common';
import { ApiTags, ApiResponse,} from '@nestjs/swagger';
import { ResponseApi } from 'src/common/dto/response-api.dto';
import { TypeProductsService } from '../services/type_products/type_products.service';
import { TypeProductsEntity } from '../data/entities/type_products.entity';
import { TypeProductsCreateDto } from '../data/dto/type_products_create.dto';
import { TypeProductsUpdateDto } from '../data/dto/type_products_update.dto';

@ApiTags('Type_products')
@Controller('type_products')
export class TypeProductsController {
    constructor(private readonly typeProductsService: TypeProductsService) { }

    @Get('GetTypeProducts')
    @ApiResponse({ status: 200, description: 'Lista de tipo de productos', type: ResponseApi<TypeProductsEntity[]> })
    @ApiResponse({ status: 204, description: 'No hay tipos de productos disponibles', type: ResponseApi })
    async getAllTypeProducts(): Promise<ResponseApi<TypeProductsEntity[]>> {
        const type_products = await this.typeProductsService.getAllTypeProducts();
        const statusCode = type_products.length > 0 ? 200 : 204;
        const message = type_products.length > 0 ? 'Tipos de productos obtenidos correctamente' : 'No hay tipos de productos disponibles';
        return new ResponseApi<TypeProductsEntity[]>(statusCode, message, type_products);
    }

    @Post('CreateTypeProduct')
    @ApiResponse({ status: 201, description: 'Tipo de producto creado', type: ResponseApi<TypeProductsEntity[]> })
    @ApiResponse({ status: 409, description: 'El tipo de producto ya existe', type: ResponseApi })
    async createTypeProduct(@Body() TypeProductsCreateDto: TypeProductsCreateDto): Promise<ResponseApi<TypeProductsEntity>> {
        const newRole = await this.typeProductsService.createTypeProduct(TypeProductsCreateDto);
        if (!newRole) {
            throw new HttpException(
              new ResponseApi(409, 'El tipo de producto ya existe'),
              HttpStatus.CONFLICT
            );
        }
        return new ResponseApi<TypeProductsEntity>(201, 'Tipo de producto creado exitosamente', newRole);
    }

    @Put('update')
    @ApiResponse({ status: 200, description: 'Tipo de producto actualizado correctamente', type: ResponseApi<TypeProductsEntity> })
    @ApiResponse({ status: 404, description: 'Tipo de producto no encontrado', type: ResponseApi })
    async updateTypeProduct(@Body() updateData: TypeProductsUpdateDto): Promise<ResponseApi<TypeProductsEntity>> {
        const updatedTypeProduct = await this.typeProductsService.updateTypeProduct(updateData);
        if (!updatedTypeProduct) {
            throw new HttpException(new ResponseApi(404, 'Tipo de producto no encontrado'), HttpStatus.NOT_FOUND);
        }
        return new ResponseApi<TypeProductsEntity>(200, 'Tipo de producto actualizado correctamente', updatedTypeProduct);
    }

    @Delete('delete/:id')
    @ApiResponse({ status: 200, description: 'Tipo de producto eliminado correctamente', type: ResponseApi })
    @ApiResponse({ status: 404, description: 'Tipo de producto no encontrado', type: ResponseApi })
    async deleteTypeProduct(@Param('id') id: string): Promise<ResponseApi<null>> {
        const deleted = await this.typeProductsService.deleteTypeProduct(id);
        if (!deleted) {
            throw new HttpException(new ResponseApi(404, 'Tipo de producto no encontrado'), HttpStatus.NOT_FOUND);
        }
        return new ResponseApi<null>(200, 'Tipo de producto eliminado correctamente', null);
    }

}