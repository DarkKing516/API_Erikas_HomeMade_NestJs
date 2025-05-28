import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../../../data/entities/baseEntity.entity';
import { RolesEntity } from './roles.entity';
import { exampleUser } from '../../../../common/utils/faker-examples';

export class UsersEntity extends BaseEntity {
  @ApiProperty({ example: exampleUser.name })
  name     : string;

  @ApiProperty({ example: exampleUser.email })
  email    : string;

  @ApiProperty({ example: exampleUser.password })
  password : string;

  @ApiProperty({ example: RolesEntity })
  role     : RolesEntity;

  @ApiProperty({ example: exampleUser.phone })
  phone    : string;

  @ApiProperty({ example: exampleUser.status })
  status  : boolean;
}