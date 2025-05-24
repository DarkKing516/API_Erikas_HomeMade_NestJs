// src/roles/dto/create-role.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({ example: 'Admin', description: 'Nombre del roles' })
  role: string;
}
