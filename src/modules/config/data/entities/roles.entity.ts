import {ApiProperty} from '@nestjs/swagger';
import {BaseEntity} from '../../../../data/entities/baseEntity.entity';
import { examplePermission, exampleRole } from '../../../../common/utils/faker-examples';

export class Roles extends BaseEntity {
    @ApiProperty({example: exampleRole.role})
    role         : string;

    @ApiProperty({example: exampleRole.status})
    status       : boolean;

    @ApiProperty({example: [examplePermission.permission], isArray: true, required: false })
    permissions? : string[]
}
