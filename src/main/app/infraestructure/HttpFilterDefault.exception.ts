import { ArgumentsHost, ExceptionFilter } from "@nestjs/common";
import { Request, Response } from 'express';
import FeaturesApp from "../application/FeaturesApp";
import { HttpExceptionFilterType, HttpExceptionType } from "../domain/types/CommonTypes.types";

export class HttpFilterDefault implements ExceptionFilter{

  reduceMsg(message: string | [string]): string{
    
    if(Array.isArray(message)){
      return message.reduce((prev, current) => FeaturesApp.reduceMessage(prev,current), '');
    }
    else return message;
  }

  catch(exception: any, host: ArgumentsHost) {

    //
    const context = host.switchToHttp();
    const requestExpress = context.getRequest<Request>();
    const responseExpress = context.getResponse<Response>();
    const exceptionResponse: HttpExceptionFilterType = exception.getResponse();

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

    const httpException: HttpExceptionType = {
      exception: {
        statusCode: exceptionResponse.statusCode,
        error: exceptionResponse.error,
        message: this.reduceMsg(exceptionResponse.message),
        date: FeaturesApp.getTimeZone(new Date()),
        layer: 'CONTROLLER',
      }
    }

    responseExpress
      .status(exceptionResponse.statusCode)
      .json(httpException);
  }
}