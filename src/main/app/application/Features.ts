import { BadRequestException, ForbiddenException, HttpStatus, InternalServerErrorException, NotFoundException, RequestTimeoutException, ServiceUnavailableException } from "@nestjs/common";
import { AsyncResp, ConfigLogger, Fault, HttpExceptionFilter, LoggerException, ObjLogger, ObjResponse, Props } from "../domain/types/TypeAliases";
import { ConfigApp } from "./ConfigApp.service";
import fetch from "cross-fetch";

//
async function httpCall<T>(props: Props): AsyncResp<T>{ 
  try{

    const {url,properties} = props;
    const response = await fetch(url,properties);

    const fetchOut: ObjResponse<T> = {
      ok: response.ok,
      statusCode: response.status,
      statusText: response.statusText,
      bodyOut: await response.json(),
    };

    return fetchOut;

  }
  catch(err: any){

    const fetchOut: ObjResponse<T> = {
      ok: false,
      statusCode: 500,
      statusText: 'Internal Server Error',
      bodyOut: String(err),
    };

    return fetchOut;
  }
}

function objToStringQuery<T>(obj: T): string{
  
  let result: string = '?';
  const objArray = Object.entries(obj);
  const length: number = objArray.length;

  for(let index = 0; index < length; index++){

    if(index === length-1){
      const objKey = objArray[index];
      result += `${objKey[0]}=${objKey[1]}`;
    }
    else{
      const objKey = objArray[index];
      result += `${objKey[0]}=${objKey[1]}&`;
    }
  }

  return result;
}

function getTimeZone(date: Date): string{

  const gmtZuluDate = date;
  const year = gmtZuluDate.getFullYear();
  const month = gmtZuluDate.getMonth();
  const day = gmtZuluDate.getDate();
  const hours = gmtZuluDate.getHours() - 5;
  const minutes = gmtZuluDate.getMinutes();
  const seconds = gmtZuluDate.getSeconds();
  const gmt05Date = new Date(year, month, day, hours, minutes, seconds);

  //
  return gmt05Date.toISOString().split(".")[0];
}

function handlerException<T>(err: ObjResponse<T>, configApp: ConfigApp): void{

  configApp.setPayloadResponse(err);
  
  switch(err.statusCode){
    
    case HttpStatus.REQUEST_TIMEOUT :{
      throw new RequestTimeoutException();
    }

    case HttpStatus.BAD_REQUEST :{
      throw new BadRequestException();
    }

    case HttpStatus.NOT_FOUND :{
      throw new NotFoundException();
    }

    case HttpStatus.FORBIDDEN:{
      throw new ForbiddenException();
    }

    case HttpStatus.SERVICE_UNAVAILABLE:{
      throw new ServiceUnavailableException();
    }

    default:{
      throw new InternalServerErrorException();
    }
  }
}

//
function reduceMessage(prev: string, current: string): string {
  if(prev === '') return `${current}`;
  else return `${prev} && ${current}`;
}

//
function getMsgExceptionFilterDefault(message: string | [string]): string{
    
  if(Array.isArray(message)){
    return message.reduce((prev, current) => reduceMessage(prev,current), '');
  }
  else return message;
}

//
function defaultHttpException(exception: HttpExceptionFilter): Fault{
  return{
    fault: {
      statusCode: exception.statusCode,
      error: exception.error,
      message: getMsgExceptionFilterDefault(exception.message),
      date: getTimeZone(new Date()),
      layer: 'Controller',
      responseBackend: 'does not apply',
    }
  }
}

function objLogger(configLogger: ConfigLogger): ObjLogger{

  const timeInit: number = configLogger.configApp.getTimeInit()/1000;
  const timeEnd: number = configLogger.configApp.getTimeEnd();

  return{
    applicationName: configLogger.configApp.getApplicationName(),
    methodName: configLogger.configApp.getMethodName(),
    verb: configLogger.configApp.getVerb(),
    transactionId: configLogger.configApp.getTransactionId(),
    level: 'info',
    layer: configLogger.isConnectivity ? 'connectivity' : 'controller',
    message: configLogger.isSuccess ? 'exitoso' : 'error',
    processingTime: timeEnd-timeInit,
    timestamp: getTimeZone(new Date()),
    urlApi: configLogger.configApp.getUrlApi(),
    urlBackend: configLogger.configApp.getUrlBackend(),
    request: configLogger.configApp.getPayloadRequest(),
    response: configLogger.configApp.getPayloadResponse(),
  }
}

function reduceMsg(message: string | [string]): string{

  if(Array.isArray(message)){
    return message.reduce((prev, current) => reduceMessage(prev,current), '');
  }

  return message;
}

function loggerException(props: LoggerException): void{

  const configLogger: ConfigLogger = {
    configApp: props.configApp,
    isConnectivity: props.isConnectivity,
    isSuccess: props.isSuccess,
  };

  props.configApp.setTimeEnd(Date.now());
  props.configApp.setPayloadResponse(props.fault);

  const loggerVO: ObjLogger = objLogger(configLogger);
  const childLogger: any = props.logger.child(loggerVO);
  childLogger.info(loggerVO.message);
}


export default {
  httpCall,
  objToStringQuery,
  getTimeZone,
  handlerException,
  reduceMessage,
  getMsgExceptionFilterDefault,
  defaultHttpException,
  objLogger,
  reduceMsg,
  loggerException,
}