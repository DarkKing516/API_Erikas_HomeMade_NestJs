import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../../../data/entities/baseEntity.entity';

export class RolesEntity extends BaseEntity{
  @ApiProperty({ example: 'Admin' })
  role   : string;

  @ApiProperty({ example: true })
  status : boolean;
}
