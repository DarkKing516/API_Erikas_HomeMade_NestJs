import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePermissionDto {
    @ApiProperty({ example: 'create:user', description: 'ID único y descriptivo para el permiso' })
    @IsString()
    @IsNotEmpty()
    id: string;

    @ApiProperty({ example: 'Crear usuarios', description: 'Nombre legible del permiso' })
    @IsString()
    @IsNotEmpty()
    permission: string;
}
