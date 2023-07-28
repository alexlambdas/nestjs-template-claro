import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";
import { Request } from 'express';
import { ConfigAppService } from "./ConfigApp.service";

@Injectable()
export class UpdateConfigAppService implements NestInterceptor{

  constructor(private configApp: ConfigAppService) {}

  setHttpConfigApp(request: Request): void {
    this.configApp.setTransactionId(String(request.headers['transactionid']));
    this.configApp.setVerb(request.method);
    this.configApp.setUrlApi(request.originalUrl);
    this.configApp.setTimeInit(Date.now());
  }

  intercept(host: ExecutionContext, next: CallHandler): Observable<any>{

    //before
    const context = host.switchToHttp();
    const request = context.getRequest<Request>();
    
    this.setHttpConfigApp(request);

    return next
      .handle()
      .pipe(tap(() => {}));
  }
}