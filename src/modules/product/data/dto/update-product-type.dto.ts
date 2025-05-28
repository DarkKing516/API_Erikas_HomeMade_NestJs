import { ApiProperty } from '@nestjs/swagger';
import { TypeProductsCreateDto } from './create-product-type.dto';

export class TypeProductsUpdateDto extends TypeProductsCreateDto{
  @ApiProperty({ example: 1, description: 'id' })
  id     : string;

  @ApiProperty({ example: true, description: 'estado' })
  status : boolean;
}
