import { ArgumentsHost, ExceptionFilter } from "@nestjs/common";
import { Response } from 'express';
import { HttpExceptionFilter } from "../domain/types/TypeAliases";
import Features from "../application/Features";

export class HttpFilterDefault implements ExceptionFilter{

  catch(exception: any, host: ArgumentsHost) {

    //
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const exceptionResponse: HttpExceptionFilter = exception.getResponse();

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

    response
      .status(exceptionResponse.statusCode)
      .json(Features.defaultHttpException(exceptionResponse));
  }
}