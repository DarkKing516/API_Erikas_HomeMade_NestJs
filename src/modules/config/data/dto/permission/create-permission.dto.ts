import {ApiProperty} from '@nestjs/swagger';
import {examplePermission} from '../../../../../common/utils/faker-examples';

export class CreatePermissionDto {
    @ApiProperty({example: examplePermission.permission})
    permission: string;
}
