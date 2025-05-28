import { ApiProperty } from '@nestjs/swagger';

export class DeleteRoleDto {
    @ApiProperty({ name: 'id', example: "1" })
    id: string;
}
