import { ApiProperty } from '@nestjs/swagger';

export class BaseEntityEnum {
  @ApiProperty({ name: 'id', example: 1 })
  id: string;

  @ApiProperty({ name: 'status', example: "Por aceptar" })
  status:
    | 'Por aceptar'
    | 'En proceso'
    | 'Realizado'
    | 'Entregado'
    | 'Rechazado';
}
