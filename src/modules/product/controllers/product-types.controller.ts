import { Controller, Get, Post, Body, Put, Delete, Param } from '@nestjs/common';
import { ApiTags, ApiResponse,} from '@nestjs/swagger';
import { ResponseApi } from 'src/common/dto/response-api.dto';
import { TypeProductsService } from '../services/product-type.service';
import { TypeProductsEntity } from '../data/entities/product-types.entity';
import { TypeProductsCreateDto } from '../data/dto/create-product-type.dto';
import { TypeProductsUpdateDto } from '../data/dto/update-product-type.dto';

@ApiTags('Product type')
@Controller('product-types')
export class TypeProductsController {
    constructor(private readonly typeProductsService: TypeProductsService) { }

    @Get('get-all')
    @ApiResponse({ status: 200, description: 'Lista de tipo de productos', type: ResponseApi<TypeProductsEntity[]> })
    @ApiResponse({ status: 204, description: 'No hay tipos de productos disponibles', type: ResponseApi })
    async getAllTypeProducts(): Promise<ResponseApi<TypeProductsEntity[]>> {
        const type_products = await this.typeProductsService.getAllTypeProducts();
        const statusCode = type_products.length > 0 ? 200 : 204;
        const message = type_products.length > 0 ? 'Tipos de productos obtenidos correctamente' : 'No hay tipos de productos disponibles';
        return new ResponseApi<TypeProductsEntity[]>(statusCode, message, type_products);
    }

    @Post('create')
    @ApiResponse({ status: 201, description: 'Tipo de producto creado', type: ResponseApi<TypeProductsEntity> })
    @ApiResponse({ status: 409, description: 'El tipo de producto ya existe', type: ResponseApi })
    async createTypeProduct(@Body() createDto: TypeProductsCreateDto): Promise<ResponseApi<TypeProductsEntity>> {
        const newTypeProduct = await this.typeProductsService.createTypeProduct(createDto);
        return new ResponseApi<TypeProductsEntity>(201, 'Tipo de producto creado exitosamente', newTypeProduct);
    }

    @Put('update')
    @ApiResponse({ status: 200, description: 'Tipo de producto actualizado correctamente', type: ResponseApi<TypeProductsEntity> })
    @ApiResponse({ status: 404, description: 'Tipo de producto no encontrado', type: ResponseApi })
    async updateTypeProduct(@Body() updateData: TypeProductsUpdateDto): Promise<ResponseApi<TypeProductsEntity>> {
        const updatedTypeProduct = await this.typeProductsService.updateTypeProduct(updateData);
        return new ResponseApi<TypeProductsEntity>(200, 'Tipo de producto actualizado correctamente', updatedTypeProduct);
    }

    @Delete('delete/:id')
    @ApiResponse({ status: 200, description: 'Tipo de producto eliminado correctamente', type: ResponseApi })
    @ApiResponse({ status: 404, description: 'Tipo de producto no encontrado', type: ResponseApi })
    async deleteTypeProduct(@Param('id') id: string): Promise<ResponseApi<boolean>> {
        const deleted = await this.typeProductsService.deleteTypeProduct(id);
        return new ResponseApi<boolean>(200, 'Tipo de producto eliminado correctamente', deleted);
    }
}