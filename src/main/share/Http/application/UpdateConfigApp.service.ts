import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";
import { Request } from 'express';
import { ConfigApp } from "./ConfigApp.service";

@Injectable()
export class UpdateConfigApp implements NestInterceptor{

  constructor(private configApp: ConfigApp) { }

  setHttpConfigApp(request: Request): void {
    this.configApp.setTransactionId(String(request.headers['transactionid']));
    this.configApp.setVerb(request.method);
    this.configApp.setUrlApi(request.originalUrl);
    this.configApp.setTimeInit(Date.now());
  }

  setPayloadRequest(request: Request): void{

    if(request.method === 'GET' && Object.entries(request.query).length > 0){
      this.configApp.setPayloadRequest(request.query);
    }

    if(request.method === 'GET' && Object.entries(request.params).length > 0){
      this.configApp.setPayloadRequest(request.params);
    }
  }

  intercept(host: ExecutionContext, next: CallHandler): Observable<any>{

    //before
    const context = host.switchToHttp();
    const request = context.getRequest<Request>();
    
    this.setHttpConfigApp(request);
    this.setPayloadRequest(request);

    return next
      .handle()
      .pipe(tap(() => {}));
  }
}