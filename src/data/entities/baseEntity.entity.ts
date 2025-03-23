import { ApiProperty } from '@nestjs/swagger';

export class BaseEntity {
  @ApiProperty({ name: 'id', example: 1 })
  id     : string;
  
  @ApiProperty({ name: 'status', example: true })
  status : boolean;
}
