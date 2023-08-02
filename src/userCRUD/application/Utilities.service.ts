import { 
  BadRequestException, 
  ForbiddenException, 
  HttpException, 
  HttpStatus, 
  InternalServerErrorException, 
  NotFoundException, 
  RequestTimeoutException, 
  ServiceUnavailableException 
} from "@nestjs/common";

import { LoggerType, ResponseType, LoggerSuccessType, ConfigLoggerExceptionType, ConfigLoggerType } from "../domain/types/Common.type";
import { ConfigAppService } from "./ConfigApp.service";

function buildStringQuery<T extends object>(obj: T): string{
  
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
function concatenateAString(prev: string, current: string): string {
  if(prev === '') return `${current}`;
  else return `${prev} && ${current}`;
}

//
function reduceMessage(message: string | [string]): string{

  if(Array.isArray(message)){
    return message.reduce((prev, current) => concatenateAString(prev,current), '');
  }

  return message;
}

function buildLoggerType(configApp: ConfigAppService): LoggerType{

  const timeInit: number = configApp.getTimeInit();
  const timeEnd: number = configApp.getTimeEnd();

  return{
    applicationName: configApp.getApplicationName(),
    methodName: configApp.getMethodName(),
    verb: configApp.getVerb(),
    transactionId: configApp.getTransactionId(),
    level: configApp.getLevelInfo(),
    layer: configApp.getLayerController(),
    message: configApp.getMessageSuccess(),
    processingTime: (timeEnd-timeInit)/1000,
    timestamp: getTimeZone(new Date()),
    urlApi: configApp.getUrlApi(),
    urlBackend: configApp.getUrlBackend(),
    request: configApp.getPayloadRequest(),
    response: configApp.getPayloadResponse(),
  }
}

function loggerSuccess(props: LoggerSuccessType): void{ 

  props.configApp.setTimeEnd(Date.now());
  props.configApp.setPayloadResponse(props.bodyOut);

  const loggerVO: LoggerType = buildLoggerType(props.configApp);
  const childLogger: any = props.logger.child(loggerVO);
  childLogger.info(loggerVO.message);
}

function loggerException(props: ConfigLoggerExceptionType): void{

  const configLogger: ConfigLoggerType = {
    configApp: props.configApp,
    isConnectivity: props.isConnectivity,
    isSuccess: props.isSuccess,
  };

  props.configApp.setTimeEnd(Date.now());
  props.configApp.setPayloadResponse(props.fault);

  const loggerType: LoggerType = buildLoggerType(configLogger.configApp);
  const childLogger: any = props.logger.child(loggerType);
  childLogger.info(loggerType.message);
}


export default {
  buildStringQuery,
  getTimeZone,
  handlerException,
  buildLoggerType,
  reduceMessage,
  loggerSuccess,
  loggerException,
}