import { BadRequestException, ForbiddenException, HttpException, HttpStatus, InternalServerErrorException, NotFoundException, RequestTimeoutException, ServiceUnavailableException } from "@nestjs/common";
import { AsyncResponse, ConfigLoggerType, FaultType, HttpExceptionFilterType, ConfigLoggerExceptionType, LoggerType, ResponseType, PropsType } from "../domain/types/TypeAliases";
import fetch from "cross-fetch";

//
async function httpCall<T>(props: PropsType): AsyncResponse<T>{ 
  try{

    const {url,properties} = props;
    const response = await fetch(url,properties);

    const fetchOut: ResponseType<T> = {
      ok: response.ok,
      statusCode: response.status,
      statusText: response.statusText,
      data: await response.json(),
    };

    return fetchOut;

  }
  catch(err: any){

    const fetchOut: ResponseType<T> = {
      ok: false,
      statusCode: 500,
      statusText: 'Internal Server Error',
      data: String(err),
    };
    return fetchOut;
  }
}

function objToStringQuery<T extends object>(obj: T): string{
  
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

function handlerException<T>(err: ResponseType<T>): HttpException{

  switch(err.statusCode){
    
    case HttpStatus.REQUEST_TIMEOUT :{
      return new RequestTimeoutException();
    }

    case HttpStatus.BAD_REQUEST :{
      return new BadRequestException();
    }

    case HttpStatus.NOT_FOUND :{
      return new NotFoundException();
    }

    case HttpStatus.FORBIDDEN:{
      return new ForbiddenException();
    }

    case HttpStatus.SERVICE_UNAVAILABLE:{
      return new ServiceUnavailableException();
    }

    default:{
      return new InternalServerErrorException();
    }
  }
}

//
function getMsgExceptionFilterDefault(message: string | [string]): string{
    
  if(Array.isArray(message)){
    return message.reduce((prev, current) => reduceMessage(prev,current), '');
  }
  else return message;
}

//
function defaultHttpException(exception: HttpExceptionFilterType): FaultType{
  return{
    fault: {
      statusCode: exception.statusCode,
      error: exception.error,
      message: getMsgExceptionFilterDefault(exception.message),
      date: getTimeZone(new Date()),
      layer: 'Controller',
      backendResponse: 'does not apply',
    }
  }
}

function objLogger(configLogger: ConfigLoggerType): LoggerType{

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

//
function reduceMessage(prev: string, current: string): string {
  if(prev === '') return `${current}`;
  else return `${prev} && ${current}`;
}

//
function reduceMsg(message: string | [string]): string{

  if(Array.isArray(message)){
    return message.reduce((prev, current) => reduceMessage(prev,current), '');
  }

  return message;
}

function loggerException(props: ConfigLoggerExceptionType): void{

  const configLogger: ConfigLoggerType = {
    configApp: props.configApp,
    isConnectivity: props.isConnectivity,
    isSuccess: props.isSuccess,
  };

  props.configApp.setTimeEnd(Date.now());
  props.configApp.setPayloadResponse(props.fault);

  const loggerType: LoggerType = objLogger(configLogger);
  const childLogger: any = props.logger.child(loggerType);
  childLogger.info(loggerType.message);
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