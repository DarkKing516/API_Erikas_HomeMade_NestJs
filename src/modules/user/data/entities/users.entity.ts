import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../../../data/entities/baseEntity.entity';
import { RolesEntity } from '../../../config/data/entities/roles.entity';

export class UsersEntity extends BaseEntity {
  @ApiProperty({ example: 'name' })
  name     : string;

  @ApiProperty({ example: 'email' })
  email    : string;

  @ApiProperty({ example: 'password' })
  password : string;

  @ApiProperty({ example: 'role' })
  role     : RolesEntity;

  @ApiProperty({ example: '1234' })
  phone    : string;

  @ApiProperty({ example: true })
  status  : boolean;
}