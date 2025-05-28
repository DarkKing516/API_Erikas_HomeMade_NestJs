import { ApiProperty } from '@nestjs/swagger';
import { exampleRole } from '../../../../../common/utils/faker-examples';

export class DeleteRoleDto {
    @ApiProperty({ example: exampleRole.role })
    id: string;
}
