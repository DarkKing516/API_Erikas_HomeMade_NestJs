import { ApiProperty } from '@nestjs/swagger';
import { TypeProductsCreateDto } from './create-product-type.dto';
import { exampleProduct } from '../../../../common/utils/faker-examples';

export class TypeProductsUpdateDto extends TypeProductsCreateDto{
  @ApiProperty({ example: exampleProduct.id })
  id     : string;

  @ApiProperty({ example: exampleProduct.booleanStatus })
  status : boolean;
}
