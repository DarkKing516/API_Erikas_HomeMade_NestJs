import { ApiProperty } from '@nestjs/swagger';
import { RoleCreateDto } from './role-create.dto';

export class RoleUpdateDto extends RoleCreateDto{
    @ApiProperty({ name: 'id', example: "Admin" })
    id: string;
}
