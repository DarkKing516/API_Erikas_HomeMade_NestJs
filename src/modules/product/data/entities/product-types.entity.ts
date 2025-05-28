import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/data/entities/baseEntity.entity';
import { exampleProduct } from '../../../../common/utils/faker-examples';

export class TypeProductsEntity extends BaseEntity {

  @ApiProperty({ example: exampleProduct.productName })
  name   : string;

  @ApiProperty({ example: exampleProduct.booleanStatus })
  status  : boolean;
}
