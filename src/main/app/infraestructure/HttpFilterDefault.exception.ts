import { ArgumentsHost, ExceptionFilter } from "@nestjs/common";
import { Response } from 'express';
import { HttpExceptionFilterType } from "../domain/types/CommonTypes.types";
import FeaturesApp from "../application/FeaturesApp";

export class HttpFilterDefault implements ExceptionFilter{

  catch(exception: any, host: ArgumentsHost) {

    //
    const context = host.switchToHttp();
    const responseExpress = context.getResponse<Response>();
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
     * 
     * 
     */

    responseExpress
      .status(exceptionResponse.statusCode)
      .json(FeaturesApp.buildDefaultHttpException(exceptionResponse));
  }
}