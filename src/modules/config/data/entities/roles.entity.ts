import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../../../data/entities/baseEntity.entity';
import { exampleRole } from '../../../../common/utils/faker-examples';

export class RolesEntity extends BaseEntity {
  @ApiProperty({ example: exampleRole.role })
  role: string;

  @ApiProperty({ example: exampleRole.status })
  status: boolean;
}
