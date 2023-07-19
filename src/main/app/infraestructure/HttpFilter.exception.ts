import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Request, Response } from "express";
import { HttpConfigAppService } from "../application/HttpConfigApp.service";
import { HttpExceptionFilterType, HttpExceptionType } from "../domain/types/CommonTypes.types";
import FeaturesApp from "../application/FeaturesApp";


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

  constructor(private readonly configService: HttpConfigAppService){}

  reduceMsg(message: string | [string]): string{

    if(Array.isArray(message)){
      return message.reduce((prev, current) => FeaturesApp.reduceMessage(prev,current), '');
    }

    if(message.split(';').length > 1){
      return message.split(';')[1];
    }

    return message;
  }

  setLayer(message: string): string {
    let msg: string = 'CONTROLLER';

    if(message.split(';').length > 1){
      return message.split(';')[0];
    }

    return msg;
  }


  catch(exception: any, host: ArgumentsHost) {

    console.log('HERE HERE ----------------- HttpFilterException');
    console.log(exception);
    //
    const context = host.switchToHttp();
    const requestExpress = context.getRequest<Request>();
    const responseExpress = context.getResponse<Response>();
    const exceptionResponse: HttpExceptionFilterType = exception['httpExceptionFilter'].getResponse();

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
        layer: this.setLayer(String(exceptionResponse.message)),
        transactionId: this.configService.getTransactionId(),
        urlApi: this.configService.getUrlApi(),
        urlBackend: this.configService.getUrlBackend(), 
      }
    }

    responseExpress
      .status(exceptionResponse.statusCode)
      .json(httpException);
  }

}