import { HttpException } from "@nestjs/common";
import { HttpCatchExceptionType } from "../domain/types/CommonTypes.types";

/**
 * 
 * @author alex
 * 
 * @description
 * This class implements the HttpException class from Nestjs framework and it will can catch all exception thrown with the
 * "CustomHttpCatchException()" object from any microservice component's.
 * 
 */
export class HttpCatchException extends HttpException{

    /**
     * 
     * @description
     * This constructor accepts as an argument a "HttpCatchException" object and pass this to the
     * constructor of "HttpException".
     * 
     * @param error 
     * custom type CustomHttpCatchException,
     * 
     */
    constructor(error: HttpCatchExceptionType){

        /**
         * 
         * @description
         * This constructor receives a object "HttpCatchException" like this:
         * 
         * {
         *      "description": "string description error",
         *      "code": 55
         * }
         * 
         * and this class return an object like this:
         * 
         * {
         *      "response": "string description error",
         *      "status": 55
         * }
         * 
         */
        super(error.description.toString(), error.code);
    }
}