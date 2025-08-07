import {ApiProperty} from '@nestjs/swagger';
import {Permissions} from "./permissions.entity";

export class MenuEntity {
    @ApiProperty()
    id          : string;

    @ApiProperty({ example: 'Dashboard' })
    titulo      : string;

    @ApiProperty({ example: '/dashboard' })
    url?        : string;

    @ApiProperty({ example: 'PieChartOutlined' })
    icono       : string;

    @ApiProperty({ example: true })
    estado      : boolean;

    @ApiProperty({ description: 'Permiso requerido para acceder', nullable: true })
    permiso     : Permissions;

    @ApiProperty({ type: () => [MenuEntity], description: 'Submenús de este menú', required: false })
    submenus?   : MenuEntity[];
}
