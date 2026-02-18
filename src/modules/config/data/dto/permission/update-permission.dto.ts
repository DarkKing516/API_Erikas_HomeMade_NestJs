import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePermissionDto {
    @ApiProperty({ example: 'create:user', description: 'ID del permiso a actualizar' })
    @IsString()
    @IsNotEmpty()
    id: string;

    @ApiProperty({ example: 'Crear usuarios (Editado)', description: 'Nuevo nombre para el permiso' })
    @IsString()
    @IsNotEmpty()
    permission: string;
}
