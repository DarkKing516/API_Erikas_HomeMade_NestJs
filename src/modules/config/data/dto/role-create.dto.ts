// src/roles/dto/role-create.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class RoleCreateDto {
  @ApiProperty({ example: 'Admin', description: 'Nombre del rol' })
  role: string;
}
