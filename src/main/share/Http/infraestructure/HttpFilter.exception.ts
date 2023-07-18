import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Injectable } from "@nestjs/common";
import { Response } from "express";
import { FaultDto } from "../domain/dtos/Fault.dto";
import { errorObjectPropertiesType } from "../domain/types/CommonTypes.types";
import { HttpConfigAppService } from "../application/HttpConfigApp.service";
import features from "../application/Features";


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
@Injectable()
export class HttpFilterException implements ExceptionFilter {

  constructor(private readonly configApp:HttpConfigAppService){}

  catch(exception: any, host: ArgumentsHost) {

    //
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const status = exception.getStatus();
    const faultResponse: FaultDto = exception.getResponse();

    /**
     * 
     * In this case, "faultResponse" object looks like this:
     * 
     * {
     *      "fault": {
     *          "transactionId": "30b927e6-34b0-4bde-b91c-50a20365d360",
     *          "timeStamp": "2022-09-14T18:25:56.385Z",
     *          "httpStatusCode": 500,
     *          "message": "error",
     *          "layer": "CONNECTION_LAYER",
     *          "path": "lnxdbdevhw.comcel.com.co:1850/PDB_PESBLOGODEV",
     *          "detailException": {
     *              "systemErrorHandler": "openshift",
     *              "originSystemError": "oracle",
     *              "originSystemErrorCode": "500",
     *              "originSystemErrorMessage": "error oracledb",
     *              "originSystemErrorDescription": "Error: ORA-12154: TNS:could not resolve the connect identifier specified"
     *          }
     *      }
     * }
     * 
     * It means that "faultResponse" models the fault standard object and it was built in either of both components:
     * 
     * - adapter-app-oracledb (OracledbRepository.service.ts)
     * - adapter-app-utility  (Utility.service.ts)
     * 
     */
    faultResponse.fault !== undefined &&
      response
        .status(status)
        .json(faultResponse);


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

    const objProperties: errorObjectPropertiesType ={
      internalFault: faultResponse,
      urlApi: this.configApp.getUrlApi(),
      fnReduceMessage: features.reduceMessage,
    };

    faultResponse.fault === undefined &&
      response
        .status(status)
        .json(features.createErrorObject(objProperties));
  }

}