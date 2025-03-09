import { Module } from '@nestjs/common';
import { TypeProductsController } from './controllers/type_products.controller';
import { TypeProductsService } from './services/type_products/type_products.service';

@Module({
  controllers: [TypeProductsController],
  providers: [TypeProductsService],
})
export class ProductsModule {}