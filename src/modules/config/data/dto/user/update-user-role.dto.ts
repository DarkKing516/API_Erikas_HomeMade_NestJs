import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { PickType } from '@nestjs/swagger';

export class UpdateUserRoleDto extends PickType(CreateUserDto, ['roleId'] as const) {}
