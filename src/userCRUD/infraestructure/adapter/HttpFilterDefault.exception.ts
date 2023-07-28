import { ArgumentsHost, ExceptionFilter } from "@nestjs/common";
import { Response } from 'express';
import { FaultType, HttpExceptionFilterType } from "../../domain/types/Common.type";
import Util from "../../application/Utilities.service";

export class HttpFilterDefaultException implements ExceptionFilter{

  defaultHttpException(exception: HttpExceptionFilterType, appName?: string, backName?: string): FaultType{
    return{
      fault: {
        statusCode: exception.statusCode,
        error: exception.error,
        message: Util.reduceMessage(exception.message),
        date: Util.getTimeZone(new Date()),
        layer: 'Controller',
        applicationName: appName,
        backendApplicationName: backName,
        backendResponse: 'does not apply',
      }
    }
  }

  catch(exception: any, host: ArgumentsHost) {

    //
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const exceptionResponse: HttpExceptionFilterType = exception.getResponse();

    /**
     * In this case, "exceptionResponse" object looks like this:
     * 
     * { 
     *    "message": "message 1" | ["message 1","message 2"]
     *    "error": "error"
     *    "statusCode": 0, 
     * }
     * 
     * It means that "exceptionResponse" object was built by "ValidationPipe" 
     * annotation in any controller class.
     */
    const appName = process.env.ENV_APP_NAME;
    const backName = process.env.ENV_BACKEND_APP_NAME;

    response
      .status(exceptionResponse.statusCode)
      .json(this.defaultHttpException(exceptionResponse,appName,backName));
  }
}

