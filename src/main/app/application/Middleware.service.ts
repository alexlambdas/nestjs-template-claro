import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { v4 as uuid } from "uuid";
import { ConfigApp } from "./ConfigApp.service";

/**
 * 
 * @author alexlambdas
 * 
 * @description
 * The main goal of this class is build or catch the "transacionid" http/header.
 * 
 */
@Injectable()
export class Middleware implements NestMiddleware {

  constructor(private readonly configApp: ConfigApp){}

  //
  private transactionid: string;

  setHttpConfigApp(request: Request): void {
    this.configApp.setTransactionId(String(request.headers['transactionid']));
    this.configApp.setVerb(request.method);
    this.configApp.setUrlApi(request.originalUrl);
    this.configApp.setTimeInit(Date.now());
  }

  setPayloadRequest(request: Request): void{

    if(request.method === this.configApp.getMethodGET() && Object.entries(request.query).length > 0){
      this.configApp.setPayloadRequest(request.query);
    }

    if(request.method === this.configApp.getMethodGET() && Object.entries(request.params).length > 0){
      this.configApp.setPayloadRequest(request.params);
    }

    if(request.method === this.configApp.getMethodPOST()){
      this.configApp.setPayloadRequest(request.body);
    }
  }

  use(request: Request, response: Response, next: NextFunction){

    this.transactionid = String(request.headers['transactionid']);

    if (this.transactionid === "undefined") {
      this.transactionid = uuid();
      request.headers.transactionid = this.transactionid;
      response.set('transactionid', this.transactionid);
    }
    else {
      request.headers.transactionid = this.transactionid;
      response.set('transactionid', this.transactionid);
    }

    this.setHttpConfigApp(request);
    this.setPayloadRequest(request);
    next();
  }
}