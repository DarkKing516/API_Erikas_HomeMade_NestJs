// src/roles/dto/create-role.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { exampleRole } from '../../../../../common/utils/faker-examples';
import { BaseEntity } from '../../../../../data/entities/baseEntity.entity';
import { Permissions } from '../../entities/permissions.entity';

export class ReturnRoleDto extends BaseEntity {
  @ApiProperty({example: exampleRole.role})
  role         : string;

  @ApiProperty({example: exampleRole.status})
  status       : boolean;

  @ApiProperty({ example: Permissions, isArray: true, required: false })
  permissions? : Permissions[]
}
