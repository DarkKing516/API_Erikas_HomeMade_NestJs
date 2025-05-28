import { Module } from '@nestjs/common';
import { TypeProductsController } from './controllers/product-types.controller';
import { TypeProductsService } from './services/product-type.service';

@Module({
  controllers : [TypeProductsController],
  providers   : [TypeProductsService],
})
export class ProductsModule {}