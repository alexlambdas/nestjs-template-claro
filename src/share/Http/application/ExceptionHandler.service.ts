import { BadRequestException, CallHandler, ExecutionContext, ForbiddenException, HttpException, HttpStatus, Inject, InternalServerErrorException, NestInterceptor, NotFoundException, RequestTimeoutException, ServiceUnavailableException } from "@nestjs/common";
import { LoggerConfigPropertiesType, ResponseType } from '../domain/types/Common.type';
import { Observable, catchError, tap } from "rxjs";
import { ConfigAppService } from "./ConfigApp.service";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import Util from "./Utilities.service";

export class ExceptionHandlerService<T> implements NestInterceptor {

  constructor(
    private readonly configApp: ConfigAppService<T>,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger) { }


  buildLoggerConfigProperties(
    responseType: ResponseType<T>,
    configApp: ConfigAppService<T>,
    logger: any,
  ): LoggerConfigPropertiesType<T> { 

    const loggerProps: LoggerConfigPropertiesType<T> = {
      configApp: configApp,
      responseType: responseType,
      logger: logger,
    };

    return loggerProps;
  }

  buildHttpError(err: ResponseType<T>): HttpException {

    switch (err.statusCode) {

      case HttpStatus.REQUEST_TIMEOUT: {
        return new RequestTimeoutException();
      }

      case HttpStatus.BAD_REQUEST: {
        return new BadRequestException();
      }

      case HttpStatus.NOT_FOUND: {
        return new NotFoundException();
      }

      case HttpStatus.FORBIDDEN: {
        return new ForbiddenException();
      }

      case HttpStatus.SERVICE_UNAVAILABLE: {
        return new ServiceUnavailableException();
      }

      default: {
        return new InternalServerErrorException();
      }
    }

  }

  intercept(host: ExecutionContext, next: CallHandler): Observable<any> {
    //before

    return next
      .handle()
      .pipe(
        // after

        tap((data) => {

          const loggerProps = this.buildLoggerConfigProperties(data, this.configApp, this.logger);
          Util.writeLog(loggerProps);

        }),
        catchError((responseType: ResponseType<T>) => {
          
          const loggerProps = this.buildLoggerConfigProperties(responseType, this.configApp, this.logger);
          Util.writeLog(loggerProps);
          throw this.buildHttpError(responseType);
        }));
  }
}
