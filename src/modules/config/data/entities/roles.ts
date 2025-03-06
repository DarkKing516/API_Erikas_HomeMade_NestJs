import { ApiProperty } from '@nestjs/swagger';

export class RolesEntity {
  @ApiProperty({ name: 'id', example: 1 })
  id     : string;

  @ApiProperty({ name: 'role', example: 'Admin' })
  role   : string;

  @ApiProperty({ name: 'status', example: true })
  status : boolean;
}
