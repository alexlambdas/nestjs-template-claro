import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Inject } from "@nestjs/common";
import { Response } from "express";
import { ConfigAppService } from "../../application/ConfigApp.service";
import { HttpExceptionFilterType, FaultType, ConfigLoggerExceptionType, ResponseType } from "../../domain/types/Common.type";
import Util from "../../application/Utilities.service";
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


  exceptionHandler(
    logger: any,
    configApp: ConfigAppService,
    responseType: ResponseType<FaultType | string>, 
    exceptionResponse: HttpExceptionFilterType): FaultType{

      switch(true){
      
        case !responseType.ok:{
  
          const faultType: FaultType = {
            fault: {
              statusCode: responseType.statusCode,
              error: responseType.statusText,
              message: responseType.statusText,
              date: Util.getTimeZone(new Date()),
              layer: configApp.getLayerConnectivity(),
              applicationName: configApp.getApplicationName(),
              transactionId: configApp.getTransactionId(),
              urlApi: configApp.getUrlApi(),
              urlBackend: configApp.getUrlBackend(), 
              backendApplicationName: configApp.getBackendApplicationName(),
              backendResponse: responseType.data,
            }
          };
  
          const loggerProps: ConfigLoggerExceptionType = {
            configApp: configApp,
            fault: faultType,
            isSuccess: false,
            isConnectivity: true,
            logger: logger,
          };
  
          //Util.loggerException(loggerProps);  
          
          return faultType;
  
        }
  
        case !configApp.getAjvError().ok:{ 
  
          const faultType: FaultType = {
            fault: {
              statusCode: exceptionResponse.statusCode,
              error: Util.reduceMessage(exceptionResponse.message),
              message: 'Backend response is not of the expected type' + ' && ' + configApp.getAjvError().message,
              date: Util.getTimeZone(new Date()),
              layer: configApp.getLayerConnectivity(),
              applicationName: configApp.getApplicationName(),
              transactionId: configApp.getTransactionId(),
              urlApi: configApp.getUrlApi(),
              urlBackend: configApp.getUrlBackend(), 
              backendApplicationName: configApp.getBackendApplicationName(),
              backendResponse: responseType.data,
            }
          };
  
          const loggerProps: ConfigLoggerExceptionType = {
            configApp: configApp,
            fault: faultType,
            isSuccess: false,
            isConnectivity: true,
            logger: logger,
          };
  
          //Util.loggerException(loggerProps);        
      
          return faultType;
        }
  
        default:{  

          const faultType: FaultType = {
            fault: {
              statusCode: exceptionResponse.statusCode,
              error: Util.reduceMessage(exceptionResponse.message),
              message: Util.reduceMessage(exceptionResponse.message),
              date: Util.getTimeZone(new Date()),
              layer: configApp.getLayerConnectivity(),
              applicationName: configApp.getApplicationName(),
              transactionId: configApp.getTransactionId(),
              urlApi: configApp.getUrlApi(),
              urlBackend: configApp.getUrlBackend(), 
              backendApplicationName: configApp.getBackendApplicationName(),
              backendResponse: responseType.data,
            }
          };
  
          const loggerProps: ConfigLoggerExceptionType = {
            configApp: configApp,
            fault: faultType,
            isSuccess: false,
            isConnectivity: true,
            logger: logger,
          };
  
          //Util.loggerException(loggerProps);
      
          return faultType;  
        }
      }
  }


  catch(exception: any, host: ArgumentsHost) {

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
    
    //
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const exceptionResponse: HttpExceptionFilterType = exception.getResponse();
    const responseType: ResponseType<FaultType | string> = this.configApp.getPayloadResponse();

    const fault = this.exceptionHandler(this.logger,this.configApp,responseType,exceptionResponse);

    return response
      .status(fault.fault.statusCode)
      .json(fault);
    
  }
}