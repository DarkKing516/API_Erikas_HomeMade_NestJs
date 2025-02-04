// src\common\dto\response-api.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class ResponseApi<T> {
    @ApiProperty({ example: 200, description: 'Código de estado HTTP' })
    statusCode: number;

    @ApiProperty({ example: 'Operación exitosa', description: 'Mensaje de respuesta' })
    message: string;

    @ApiProperty({ description: 'Datos de la respuesta', required: false })
    data?: T | null;

    @ApiProperty({ description: 'Imagen God', required: false, example: 'https://http.cat/[statusCode]' })
    errorImage?: string;

    constructor(statusCode: number, message: string, data?: T | null) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data ?? null;
        this.errorImage = `https://http.cat/${statusCode}`;
    }
}
