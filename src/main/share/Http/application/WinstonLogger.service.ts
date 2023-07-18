import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Observable, tap } from "rxjs";
import { HttpConfigAppService } from "./HttpConfigApp.service";
import { LoggerType } from "../domain/types/CommonTypes.types";
import common from "./Features";

@Injectable()
export class WinstonLoggerService implements NestInterceptor{

  constructor(
    private readonly configApp: HttpConfigAppService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger){}

  setPayloadResponse(data: any): void{
    this.configApp.setPayloadResponse(data);
  }

  setTimeEnd(dateNow: number): void{
    this.configApp.setTimeEnd(dateNow);
  }

  buildLoggerVO(): LoggerType{
    return{
      applicationName: this.configApp.getApplicationName(),
      methodName: this.configApp.getMethodName(),
      verb: this.configApp.getVerb(),
      transactionId: this.configApp.getTransactionId(),
      level: "info",
      layer: "INFRAESTRUCTURE_CONNECTIVITY",
      message: "exitoso",
      processingTime: (this.configApp.getTimeEnd() - this.configApp.getTimeInit())/1000,
      timestamp: common.getTimeZone(new Date()),
      urlApi: this.configApp.getUrlApi(),
      urlBackend: this.configApp.getUrlBackend(),
      request: this.configApp.getPayloadRequest(),
      response: this.configApp.getPayloadResponse(),
    }
  }

  

  intercept(host: ExecutionContext, next: CallHandler): Observable<any>{

    //before

    return next
      .handle()
      .pipe(tap((data) => {

        // after
        this.setTimeEnd(Date.now());
        this.setPayloadResponse(data);
        const loggerVO: LoggerType = this.buildLoggerVO();
        const childLogger: any = this.logger.child(loggerVO);
        childLogger.info(loggerVO.message);
      }));
  }
}