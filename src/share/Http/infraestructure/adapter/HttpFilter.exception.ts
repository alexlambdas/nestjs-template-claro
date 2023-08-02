import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Inject } from "@nestjs/common";
import { Response } from "express";
import { ConfigAppService } from "../../application/ConfigApp.service";
import { HttpExceptionFilterType, FaultType, ResponseType } from "../../domain/types/Common.type";
import Util from "../../application/Utilities.service";


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
export class HttpFilterException<T> implements ExceptionFilter {

  constructor(private readonly configApp: ConfigAppService){ }


  buildFaultType(
    responseType: ResponseType<T>, 
    exceptionResponse: HttpExceptionFilterType,
    configApp: ConfigAppService
    ): FaultType{

      const faultType: FaultType = {
        fault: {
          statusCode: responseType.statusCode,
          error: responseType.statusText,
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

      return faultType;
  }


  catch<T>(exception: any, host: ArgumentsHost) {

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
    const responseType: ResponseType<T> = this.configApp.getPayloadResponse();

    const faultType = this.buildFaultType(responseType,exceptionResponse,this.configApp);

    return response
      .status(faultType.fault.statusCode)
      .json(faultType);
    
  }
}