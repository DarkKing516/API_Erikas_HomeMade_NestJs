import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../../../data/entities/baseEntity.entity';
import { exampleUser } from '../../../../common/utils/faker-examples';

export class Users extends BaseEntity {
  @ApiProperty({ example: exampleUser.name })
  name     : string;

  @ApiProperty({ example: exampleUser.email })
  email    : string;

  @ApiProperty({ example: exampleUser.password })
  password : string;

  @ApiProperty({ example: exampleUser.phone })
  phone    : string;

  @ApiProperty({ example: exampleUser.status })
  status   : boolean;

  @ApiProperty({ example: [exampleUser.id], isArray: true, required: false })
  roles?   : string[]; // Solo los IDs
}
