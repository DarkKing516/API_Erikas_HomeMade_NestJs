import {ApiProperty} from '@nestjs/swagger';
import {exampleMenu, examplePermission} from '../../../../../common/utils/faker-examples';

export class CreateMenuDto {
  @ApiProperty({ example: exampleMenu.titulo })
  titulo      : string;

  @ApiProperty({ example: exampleMenu.url, required: false })
  url?        : string;

  @ApiProperty({ example: exampleMenu.icono })
  icono       : string;

  @ApiProperty({ example: exampleMenu.estado })
  estado      : boolean;

  @ApiProperty({ description: 'ID del permiso requerido para acceder', example: examplePermission.id })
  id_permiso  : string;

  @ApiProperty({ type: () => [CreateMenuDto], description: 'Submenús de este menú', required: false })
  submenus?   : CreateMenuDto[];
}