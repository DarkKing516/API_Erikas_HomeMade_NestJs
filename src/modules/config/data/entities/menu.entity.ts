import { ApiProperty } from '@nestjs/swagger';
import { Permissions } from './permissions.entity';
import { BaseEntity } from '../../../../data/entities/baseEntity.entity';

export class MenuEntity extends BaseEntity {
  @ApiProperty({ example: 'Dashboard' })
  titulo     : string;

  @ApiProperty({ example: '/dashboard' })
  url?       : string;

  @ApiProperty({ example: 'PieChartOutlined' })
  icono      : string;

  @ApiProperty({ example: true })
  estado     : boolean;

  @ApiProperty({ description: 'ID del permiso requerido', example: 'abc123' })
  id_permiso : string;      // lo que realmente se guarda en Firestore

  @ApiProperty({ description: 'Permiso requerido para acceder', type: () => Permissions })
  permiso?   : Permissions; // lo que se expone en la API, ya "resuelto"

  @ApiProperty({ type: () => [MenuEntity], description: 'Submenús de este menú', required: false })
  submenus?  : MenuEntity[];
}
