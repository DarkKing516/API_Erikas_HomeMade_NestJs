import { ApiProperty } from '@nestjs/swagger';
import { exampleUser } from '../../../../../common/utils/faker-examples';
import { BaseEntity } from '../../../../../data/entities/baseEntity.entity';
import { ReturnRoleDto } from '../role/return-role.dto';

export class ReturnUserDto extends BaseEntity {
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

  @ApiProperty({ example: ReturnRoleDto, isArray: true })
  roles?   : ReturnRoleDto[];
}
