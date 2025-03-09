import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/data/entities/base';

export class TypeProductsEntity extends BaseEntity {

  @ApiProperty({ name: 'name', example: 'Manualidades' })
  name   : string;
}
