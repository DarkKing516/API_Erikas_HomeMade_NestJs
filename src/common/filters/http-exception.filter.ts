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

        // Extraer el mensaje, manejando strings y arrays (errores de validación)
        let message = 'Error inesperado';

        if (typeof errorResponse === 'string') {
            message = errorResponse;
        } else if (typeof errorResponse === 'object' && errorResponse !== null) {
            const rawMessage = errorResponse['message'];
            message = Array.isArray(rawMessage) ? rawMessage.join(', ') : rawMessage || exception.message;
        }

        response.status(status).json(
            new ResponseApi(status, message, null)
        );
    }
}
