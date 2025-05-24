import { ApiProperty } from '@nestjs/swagger';

export class RolesEntity {
  @ApiProperty({ example: 1 })
  id     : string;

  @ApiProperty({ example: 'Admin' })
  role   : string;

  @ApiProperty({ example: true })
  status : boolean;
}
