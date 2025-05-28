// src/roles/dto/create-role.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { exampleRole } from '../../../../../common/utils/faker-examples';

export class CreateRoleDto {
  @ApiProperty({ example: exampleRole.role })
  role: string;
}
