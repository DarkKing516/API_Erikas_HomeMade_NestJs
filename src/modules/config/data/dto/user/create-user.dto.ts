import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'name' })
  name        : string;

  @ApiProperty({ example: 'email' })
  email       : string;

  @ApiProperty({ example: 'password' })
  password    : string;

  @ApiProperty({ example: 'role' })
  roleId?     :string ;

  @ApiProperty({ example: '1234' })
  phone       : string;

}