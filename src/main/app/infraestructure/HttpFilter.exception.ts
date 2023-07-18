import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Injectable } from "@nestjs/common";
import { Request, Response } from "express";
import { HttpConfigAppService } from "../application/HttpConfigApp.service";


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

  catch(exception: any, host: ArgumentsHost) {

    //
    const context = host.switchToHttp();
    const requestExpress = context.getRequest<Request>();
    const responseExpress = context.getResponse<Response>();
    const status = exception.getStatus();
    const response = exception.getResponse();

    /**
     * In this case, "faultResponse" object looks like this:
     * 
     * { 
     *      "status": 0, 
     *      "response": "string"
     * }
     * 
     * This means that "faultResponse" object was built by "ValidationPipe" in any controller class.
     * 
     * Then since the "faultException" field doesn't exits in the "faultResponse" object, We should create
     * the fault standard object using "fnGetObjectFault" function.
     * 
     */

    const objProperties = {
      fault: {
        statusCode: status,
        statusMessage: 'error',
        transactionId: this.configService.getTransactionId(),
        date: (new Date()).toISOString(),
        urlApi: this.configService.getUrlApi(),
        urlBackend: this.configService.getUrlBackend(),
        detail: {
          systemErrorHandler: 'openshift',
          originSystemError: 'backend',
          description: response,
        }
      }
    }

    responseExpress
      .status(status)
      .json(objProperties);
  }

}