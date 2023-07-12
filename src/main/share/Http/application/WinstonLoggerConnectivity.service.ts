import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Observable, tap } from "rxjs";
import { LoggerType } from "../domain/types/Custom.types";
import { CommonStateService } from "./CommonState.service";
import { UtilityService } from "./Utility.service";

@Injectable()
export class WinstonLoggerConnectivityService implements NestInterceptor {

  constructor(private configService: ConfigService,
    private util: UtilityService,
    private state: CommonStateService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger) { }

  intercept(host: ExecutionContext, next: CallHandler): Observable<any> {

    //
    return next
      .handle()
      .pipe(tap((data) => {

        //
        let loggerVO: LoggerType = {
          applicationName: this.configService.get<string>('NODE_ENV_APPLICATION_NAME'),
          methodName: this.configService.get<string>('NODE_ENV_METHOD_NAME'),
          verb: this.state.getVerb(),
          transactionId: this.state.getTransactionId(),
          level: "info",
          layer: "CONNECTIVITY",
          message: "success",
          processingTime: (this.state.getTimeEndConnectivity() - this.state.getTimeInitConnectivity()) / 1000,
          timestamp: this.util.fnGetTimeZonePort(),
          urlBackend: this.configService.get<string>('NODE_ENV_URL_BACKEND'),
          request: this.util.fnAppropriateRequest(this.state.getVerb()),
          response: this.state.getConnectionLayer().bodyOut,
          type: undefined,
        };

        //
        const childLogger: any = this.logger.child(loggerVO);
        childLogger.info(loggerVO.message);

      }));
  }

  public buildObjectLogger(): LoggerType {
    return {
      applicationName: this.configService.get<string>('NODE_ENV_APPLICATION_NAME'),
      methodName: this.configService.get<string>('NODE_ENV_METHOD_NAME'),
      verb: this.state.getVerb(),
      transactionId: this.state.getTransactionId(),
      level: "info",
      layer: "CONNECTIVITY",
      message: "success",
      processingTime: (this.state.getTimeEndConnectivity() - this.state.getTimeInitConnectivity()) / 1000,
      timestamp: this.util.fnGetTimeZonePort(),
      urlBackend: this.configService.get<string>('NODE_ENV_URL_BACKEND'),
      request: this.util.fnAppropriateRequest(this.state.getVerb()),
      response: this.state.getConnectionLayer().bodyOut,
      type: undefined,
    }
  }
}