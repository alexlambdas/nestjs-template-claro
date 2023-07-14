import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { v4 as uuid } from "uuid";

/**
 * 
 * @author Fábrica Digital
 * 
 * @description
 * The main goal of this class is build or catch the "transacionid" http/header.
 * 
 */
@Injectable()
export class MiddlewareService implements NestMiddleware {

  use(request: Request, response: Response, next: NextFunction){

    //
    let transactionid: string = String(request.headers['transactionid']);

    //
    if (transactionid === "undefined") {
      transactionid = uuid();
      request.headers.transactionid = transactionid;
      response.set('transactionid', transactionid);
    }
    else {
      request.headers.transactionid = transactionid;
      response.set('transactionid', transactionid);
    }

    //
    next();
  }
}