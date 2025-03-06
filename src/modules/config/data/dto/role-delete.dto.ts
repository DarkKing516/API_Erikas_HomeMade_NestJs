import { ApiProperty } from '@nestjs/swagger';

export class RoleDeleteDto {
    @ApiProperty({ name: 'id', example: "1" })
    id: string;
}
