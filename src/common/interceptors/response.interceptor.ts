// src/common/interceptors/response.interceptor.ts
import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { ResponseApi } from '../dto/response-api.dto';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ResponseApi<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseApi<T>> {
        return next.handle().pipe(
            map(data => new ResponseApi<T>(200, 'Operación exitosa', data))
        );
    }
}
