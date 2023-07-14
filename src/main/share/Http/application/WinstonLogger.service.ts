import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Observable, tap } from "rxjs";
import { ConfigAppHttpService } from "./ConfigAppHttp.service";
import { Request } from "express";
import { LoggerType, PayloadType } from "../domain/types/CustomTypes.types";

@Injectable()
export class WinstonLoggerService implements NestInterceptor{

  constructor(
    private configApp: ConfigAppHttpService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger
  ){}

  getTimeZone(date: Date): string{

    const gmtZuluDate = date;
    const year = gmtZuluDate.getFullYear();
    const month = gmtZuluDate.getMonth();
    const day = gmtZuluDate.getDate();
    const hours = gmtZuluDate.getHours() - 5;
    const minutes = gmtZuluDate.getMinutes();
    const seconds = gmtZuluDate.getSeconds();
    const gmt05Date = new Date(year, month, day, hours, minutes, seconds);

    //
    return gmt05Date.toISOString().split(".")[0];
  }

  setCustomHttpState(request: Request): void{
    this.configApp.setTransactionId(String(request.headers['transactionid']));
    this.configApp.setVerb(request.method);
    this.configApp.setUrlApi(request.originalUrl);
    this.configApp.setTimeInit(Date.now());
  }

  setPayloadResponse(data: any): void{
    let objPayload: PayloadType = this.configApp.getPayload();
    this.configApp.setPayload({...objPayload, bodyOut: data})
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
      timestamp: this.getTimeZone(new Date()),
      urlApi: this.configApp.geUrlApi(),
      urlBackend: this.configApp.getUrlBackend(),
      request: this.configApp.getPayload().bodyIn,
      response: this.configApp.getPayload().bodyOut,
    }
  }

  

  intercept(host: ExecutionContext, next: CallHandler): Observable<any>{

    const context = host.switchToHttp();
    const request = context.getRequest<Request>();
    
    //before
    this.setCustomHttpState(request);

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