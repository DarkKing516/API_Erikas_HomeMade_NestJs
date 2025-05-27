import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/data/entities/baseEntity.entity';

export class TypeProductsEntity extends BaseEntity {

  @ApiProperty({ example: 'Manualidades' })
  name   : string;

  @ApiProperty({ example: true })
  status  : boolean;
}
