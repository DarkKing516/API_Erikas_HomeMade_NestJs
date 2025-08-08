// src/roles/dto/create-role.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import {
  examplePermission,
  exampleRole,
} from '../../../../../common/utils/faker-examples';

export class CreateRoleDto {
  @ApiProperty({ example: exampleRole.role })
  role         : string;

  @ApiProperty({ example: [examplePermission.permission], isArray: true, required: false, })
  permissions? : string[];
}
