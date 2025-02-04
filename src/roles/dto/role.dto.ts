// src/roles/dto/role.schema.ts
import { ApiProperty } from '@nestjs/swagger';

export class Role {
    @ApiProperty({ description: 'ID del rol' })
    id: string;

    @ApiProperty({ description: 'Nombre del rol' })
    name: string;
}
