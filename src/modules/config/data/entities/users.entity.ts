import {ApiProperty} from '@nestjs/swagger';
import {BaseEntity} from '../../../../data/entities/baseEntity.entity';
import {Roles} from './roles.entity';
import {exampleUser} from '../../../../common/utils/faker-examples';

export class Users extends BaseEntity {
  @ApiProperty({ example: exampleUser.name })
  name     : string;

  @ApiProperty({ example: exampleUser.email })
  email    : string;

  @ApiProperty({ example: exampleUser.password })
  password : string;

  @ApiProperty({ example: Roles })
  role     : Roles;

  @ApiProperty({ example: exampleUser.phone })
  phone    : string;

  @ApiProperty({ example: exampleUser.status })
  status  : boolean;
}