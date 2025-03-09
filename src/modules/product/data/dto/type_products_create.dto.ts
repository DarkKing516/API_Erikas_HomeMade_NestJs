import { ApiProperty } from '@nestjs/swagger';

export class TypeProductsCreateDto {
  @ApiProperty({ example: 'Manualidades', description: 'Nombre del tipo de producto' })
  name: string;
}
