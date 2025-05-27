import { ApiProperty } from '@nestjs/swagger';

export class BaseEntity {
  @ApiProperty({ name: 'id', example: 1 })
  id          : string;

  @ApiProperty({ example: new Date() })
  created?     : Date;

  @ApiProperty({ example: new Date() })
  updated?    : Date;
}
