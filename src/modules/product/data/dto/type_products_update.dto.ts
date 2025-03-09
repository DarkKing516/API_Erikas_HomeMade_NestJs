import { ApiProperty } from '@nestjs/swagger';
import { TypeProductsCreateDto } from './type_products_create.dto';

export class TypeProductsUpdateDto extends TypeProductsCreateDto{
  @ApiProperty({ example: 1, description: 'id' })
  id: string;

  @ApiProperty({ example: true, description: 'estado' })
  status: boolean;
}
