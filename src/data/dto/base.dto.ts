import { ApiProperty } from '@nestjs/swagger';

export class BaseDto {
    @ApiProperty({ example: 1, description: 'id' })
    id: string;

    @ApiProperty({ example: true, description: 'estado' })
    status: boolean;
}
