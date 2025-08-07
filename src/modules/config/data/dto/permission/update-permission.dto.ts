import {ApiProperty} from '@nestjs/swagger';
import {CreatePermissionDto} from './create-permission.dto';
import {exampleRole} from '../../../../../common/utils/faker-examples';

export class UpdatePermissionDto extends CreatePermissionDto {
    @ApiProperty({example: exampleRole.role})
    id: string;
}
