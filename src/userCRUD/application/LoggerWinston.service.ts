import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Observable, tap } from "rxjs";
import { ConfigAppService } from "./ConfigApp.service";
import { LoggerSuccessType } from "../domain/types/Common.type";
import Util from "./Utilities.service";


@Injectable()
export class LoggerWinstonService implements NestInterceptor{

  constructor(
    private readonly configApp: ConfigAppService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger){}

  intercept(host: ExecutionContext, next: CallHandler<Observable<any>>): Observable<any>{

    //before
    
    return next
      .handle()
      .pipe(
        tap((data) => {
          // after

          const props: LoggerSuccessType = {
            configApp: this.configApp,
            bodyOut: data,
            logger: this.logger,
          };

          Util.loggerSuccess(props);
        }),
      );
  }
}