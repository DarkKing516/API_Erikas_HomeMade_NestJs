import { ApiProperty } from '@nestjs/swagger';
import { exampleProduct } from '../../../../common/utils/faker-examples';

export class TypeProductsCreateDto {
  @ApiProperty({ example: exampleProduct.productName, description: 'Nombre del tipo de producto' })
  name: string;
}
