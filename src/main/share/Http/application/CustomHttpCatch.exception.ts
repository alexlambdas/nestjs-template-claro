import { HttpException } from "@nestjs/common";
import { CustomHttpCatchExceptionType } from "../domain/types/CustomTypes.types";

/**
 * 
 * @author alex
 * 
 * @description
 * This class implements the HttpException class from Nestjs framework and it will can catch all exception thrown with the
 * "CustomHttpCatchException()" object from any microservice component's.
 * 
 */
export class CustomHttpCatchException extends HttpException{

    /**
     * 
     * @description
     * This constructor accepts as an argument a "CustomHttpCatchException" object and pass this to the
     * constructor of "HttpException".
     * 
     * @param err 
     * custom type CustomHttpCatchException,
     * 
     */
    constructor(err: CustomHttpCatchExceptionType){

        /**
         * 
         * @description
         * This constructor receives a object "CustomHttpCatchException" like this:
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
        super(err.description.toString(), err.code);
    }
}