import { ApiProperty } from '@nestjs/swagger';
import { exampleUser } from '../../../../../common/utils/faker-examples';

export class CreateUserDto {
  @ApiProperty({ example: exampleUser.name })
  name        : string;

  @ApiProperty({ example: exampleUser.email })
  email       : string;

  @ApiProperty({ example: exampleUser.password })
  password    : string;

  @ApiProperty({ example: exampleUser.id })
  roleId?     :string ;

  @ApiProperty({ example: exampleUser.phone })
  phone       : string;

}