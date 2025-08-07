// src/common/interceptors/global-error.interceptor.ts
import {
    CallHandler,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
    Logger,
    NestInterceptor,
} from '@nestjs/common';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {QueryFailedError} from 'typeorm';
import * as crypto from 'node:crypto';
import * as moment from 'moment';
import {LogService} from '../../lib/services/log.service';
import {ResponseApi} from '../dto/response-api.dto';

@Injectable()
export class GlobalErrorInterceptor implements NestInterceptor {
  constructor(private readonly logService: LogService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
          const logger       = new Logger('Error en servicio');
          const request      = context.switchToHttp().getRequest();
          const response     = context.switchToHttp().getResponse();
          const method       = request.method;
          const url          = request.url;
          const body         = request.body;
          const bodyResponse = response.body;
          const errorId      = moment().format('DDMMYYYY-HHmmss-') + crypto.randomUUID();

        if (error instanceof QueryFailedError) {
          (async () => await this.logService.createLog('DB', error.message, JSON.stringify(body), JSON.stringify(bodyResponse), url, method))();
          logger.error(`Error en DB: ${error.message}`, error.stack);
            const status = HttpStatus.INTERNAL_SERVER_ERROR;
            return throwError(() => new HttpException(new ResponseApi(status, 'Error en la base de datos', null,), status,),
          );
        }
        if (error instanceof HttpException) {
          logger.error(`Error HTTP: ${error.message}`, error.stack);
          (async () => await this.logService.createLog('HTTP', error.message, JSON.stringify(body), JSON.stringify(bodyResponse), url, method,))();
          const status = error.getStatus();
          return throwError(() => {
            // const errors =
            //   Object.keys(error.getResponse()).length > 0
            //     ? (error.getResponse() as { message: string[] }).message
            //     : error.message;
            return new HttpException(new ResponseApi(status, typeof response === 'object' && 'message' in response ? response['message'] : error.message, null,), HttpStatus.BAD_REQUEST,);
          });
        }
        logger.error(`Error: ${error.message}`, error.stack);
        return throwError(() => {
          (async () =>
            await this.logService.createLog('ERR', error.message, JSON.stringify(body), JSON.stringify(bodyResponse), url, method,))();
            return new HttpException(new ResponseApi(HttpStatus.INTERNAL_SERVER_ERROR, 'Ocurrió un error interno en el servidor', null,), HttpStatus.INTERNAL_SERVER_ERROR,);
        });
      }),
    );
  }
}
