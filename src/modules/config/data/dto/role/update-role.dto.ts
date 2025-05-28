import { ApiProperty } from '@nestjs/swagger';
import { CreateRoleDto } from './create-role.dto';
import { exampleRole } from '../../../../../common/utils/faker-examples';

export class UpdateRoleDto extends CreateRoleDto{
    @ApiProperty({ example: exampleRole.role })
    id: string;
}
