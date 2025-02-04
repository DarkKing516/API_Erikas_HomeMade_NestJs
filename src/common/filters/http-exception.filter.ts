import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { ResponseApi } from '../dto/response-api.dto';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        const status = exception.getStatus();
        const errorResponse = exception.getResponse();

        // Verifica si `errorResponse` es un objeto con `message`, o si es un string directamente
        const message =
            typeof errorResponse === 'string'
                ? errorResponse
                : errorResponse['message'] || 'Error inesperado';

        response.status(status).json(
            new ResponseApi(status, message, null)
        );
    }
}
