import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/data/entities/baseEntity.entity';

export class TypeProductsEntity extends BaseEntity {

  @ApiProperty({ name: 'name', example: 'Manualidades' })
  name   : string;
}
