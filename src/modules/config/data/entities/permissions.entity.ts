import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../../../data/entities/baseEntity.entity';

export class Permissions extends BaseEntity {
    @ApiProperty({ example: 'create:user', description: 'ID descriptivo del permiso' })
    id: string;

    @ApiProperty({ example: 'Crear usuarios', description: 'Nombre o descripción del permiso' })
    permission: string;

    @ApiProperty({ example: true, description: 'Estado del permiso' })
    status: boolean;
}
