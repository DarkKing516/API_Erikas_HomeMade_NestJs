// src\common\interceptors\global-error.interceptor.ts
import { CallHandler, ExecutionContext, Injectable, NestInterceptor, HttpException, HttpStatus, Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Observable, catchError, throwError } from 'rxjs';
import { ResponseApi } from '../dto/response-api.dto';

@Injectable()
export class GlobalErrorInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            catchError((error) => {
                if (error instanceof HttpException) {
                    return throwError(() => error);
                }

                return throwError(() =>
                    new HttpException(
                        new ResponseApi(500, 'Error interno del servidor'),
                        HttpStatus.INTERNAL_SERVER_ERROR
                    )
                );
            })
        );
    }
}
