import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Inject } from "@nestjs/common";
import { Request, Response } from "express";
import { ConfigAppService } from "../application/ConfigApp.service";
import { HttpExceptionFilterType, FaultType, ConfigLoggerExceptionType, ResponseType } from "../domain/types/TypeAliases";
import Features from "../application/Features";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";


/**
 * 
 * @author alexlambdas
 * 
 * @description
 * The main goal of this class is catch all thrown exception in any component of the project. It is possible why
 * implements the "ExceptionFilter" interface provided for Nestjs framework.
 * 
 */
@Catch(HttpException)
export class HttpFilterException implements ExceptionFilter {

  constructor(
    private readonly configApp: ConfigAppService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger){}


  catch(exception: any, host: ArgumentsHost) {
    
    //
    const context = host.switchToHttp();
    const requestExpress = context.getRequest<Request>();
    const response = context.getResponse<Response>();
    const exceptionResponse: HttpExceptionFilterType = exception.getResponse();
    const responseType: ResponseType<FaultType | string> = this.configApp.getPayloadResponse();

    /**
     * In this case, "exceptionResponse" object looks like this:
     * 
     * { 
     *      "message": "message with descriptions"
     *      "error": "error"
     *      "statusCode": 0, 
     * }
     * 
     * This means that "faultResponse" object was built by "ValidationPipe" in any controller class.
     */

    switch(true){
      
      case !responseType.ok:{

        const faultType: FaultType = {
          fault: {
            statusCode: responseType.statusCode,
            error: responseType.statusText,
            message: responseType.statusText,
            date: Features.getTimeZone(new Date()),
            layer: 'Connectivity',
            transactionId: this.configApp.getTransactionId(),
            urlApi: this.configApp.getUrlApi(),
            urlBackend: this.configApp.getUrlBackend(), 
            backendResponse: responseType.data,
          }
        };

        const loggerProps: ConfigLoggerExceptionType = {
          configApp: this.configApp,
          fault: faultType,
          isSuccess: false,
          isConnectivity: true,
          logger: this.logger,
        };

        Features.loggerException(loggerProps);        
    
        return response
          .status(faultType.fault.statusCode)
          .json(faultType);

      }

      case !this.configApp.getAjvError().ok:{ 

        const faultType: FaultType = {
          fault: {
            statusCode: exceptionResponse.statusCode,
            error: Features.reduceMsg(exceptionResponse.message),
            message: 'Backend response is not of the expected type' + ' && ' + this.configApp.getAjvError().message,
            date: Features.getTimeZone(new Date()),
            layer: 'Connectivity',
            transactionId: this.configApp.getTransactionId(),
            urlApi: this.configApp.getUrlApi(),
            urlBackend: this.configApp.getUrlBackend(), 
            backendResponse: responseType.data,
          }
        };

        const loggerProps: ConfigLoggerExceptionType = {
          configApp: this.configApp,
          fault: faultType,
          isSuccess: false,
          isConnectivity: true,
          logger: this.logger,
        };

        Features.loggerException(loggerProps);        
    
        return response
          .status(faultType.fault.statusCode)
          .json(faultType);
      }

      default:{  
    
        return response
          .status(exceptionResponse.statusCode)
          .json(response); 
      }
    }
  }
}