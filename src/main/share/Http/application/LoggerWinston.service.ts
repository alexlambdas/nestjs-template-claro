import { CallHandler, ExecutionContext, Inject, Injectable, InternalServerErrorException, NestInterceptor } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Observable, tap } from "rxjs";
import { ConfigApp } from "./ConfigApp.service";
import { LoggerSuccess } from "../domain/types/TypeAliases";
import Features from "./Features";


@Injectable()
export class LoggerWinston implements NestInterceptor{
  reflector: any;

  constructor(
    private readonly configApp: ConfigApp,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger){}

  intercept(host: ExecutionContext, next: CallHandler<Observable<any>>): Observable<any>{

    //before
    
    return next
      .handle()
      .pipe(
        tap((data) => {
          // after

          const loggerProps: LoggerSuccess = {
            configApp: this.configApp,
            bodyOut: data,
            isSuccess: true,
            isConnectivity: true,
            logger: this.logger,
          };

          Features.loggerSuccess(loggerProps);
        }),
      );
  }
}