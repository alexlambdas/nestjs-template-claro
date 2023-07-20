import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Inject } from "@nestjs/common";
import { Request, Response } from "express";
import { ConfigApp } from "../application/ConfigApp.service";
import { HttpExceptionFilter, Fault, LoggerException } from "../domain/types/TypeAliases";
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
    private readonly configApp: ConfigApp,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger){}


  catch(exception: any, host: ArgumentsHost) {
    
    //
    const context = host.switchToHttp();
    const requestExpress = context.getRequest<Request>();
    const response = context.getResponse<Response>();
    const exceptionResponse: HttpExceptionFilter = exception.getResponse();
    const objResp = this.configApp.getPayloadResponse();

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
     * 
     * 
     */
    //console.log(objResp);

    switch(true){

      case typeof objResp.bodyOut === 'string':{ 

        const objException: Fault = {
          fault: {
            statusCode: exceptionResponse.statusCode,
            error: exceptionResponse.error,
            message: String(objResp.bodyOut),
            date: Features.getTimeZone(new Date()),
            layer: 'connectivity',
            transactionId: this.configApp.getTransactionId(),
            urlApi: this.configApp.getUrlApi(),
            urlBackend: this.configApp.getUrlBackend(), 
            responseBackend: objResp.bodyOut,
          }
        };

        const loggerProps: LoggerException = {
          configApp: this.configApp,
          fault: objException,
          isSuccess: false,
          isConnectivity: true,
          logger: this.logger,
        };

        Features.loggerException(loggerProps);        
    
        return response
          .status(exceptionResponse.statusCode)
          .json(objException);
      }

      case typeof objResp.bodyOut === 'object' && typeof objResp.bodyOut.fault !== undefined:{

        const message = typeof objResp.bodyOut.fault !== undefined ? objResp.bodyOut.fault.message : exceptionResponse.error;

        const objException: Fault = {
          fault: {
            statusCode: exceptionResponse.statusCode,
            error: exceptionResponse.error,
            message: message,
            date: Features.getTimeZone(new Date()),
            layer: 'connectivity',
            transactionId: this.configApp.getTransactionId(),
            urlApi: this.configApp.getUrlApi(),
            urlBackend: this.configApp.getUrlBackend(), 
            responseBackend: objResp.bodyOut,
          }
        };

        const loggerProps: LoggerException = {
          configApp: this.configApp,
          fault: objException,
          isSuccess: false,
          isConnectivity: true,
          logger: this.logger,
        };

        Features.loggerException(loggerProps);
  
        return response
          .status(exceptionResponse.statusCode)
          .json(objException);
      }

      default:{
        
        const objException: Fault = {
          fault: {
            statusCode: exceptionResponse.statusCode,
            error: exceptionResponse.error,
            message: Features.reduceMsg(exceptionResponse.message),
            date: Features.getTimeZone(new Date()),
            layer: 'controller',
            transactionId: this.configApp.getTransactionId(),
            urlApi: this.configApp.getUrlApi(),
            urlBackend: this.configApp.getUrlBackend(), 
            responseBackend: 'does not apply',
          }
        };

        const loggerProps: LoggerException = {
          configApp: this.configApp,
          fault: objException,
          isSuccess: false,
          isConnectivity: false,
          logger: this.logger,
        };

        Features.loggerException(loggerProps);
    
        return response
          .status(exceptionResponse.statusCode)
          .json(objException);
      }
    }
  }
}