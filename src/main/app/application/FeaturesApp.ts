import { BadRequestException, InternalServerErrorException, RequestTimeoutException } from "@nestjs/common";
import { ConnExceptionType, HttpExceptionFilterType, HttpExceptionType, HttpPropertiesType } from "../domain/types/CommonTypes.types";
import fetch from "cross-fetch";

//
async function httpCall<T>(httpProperties: HttpPropertiesType): Promise<T> {

  try{

    const { url, props } = httpProperties;
    const response = await fetch(url, props);

    if(response.status >= 200 && response.status <= 299){
      return await response.json();
    }
    else{
      throw (await response.json()); 
    }
  }
  catch(err: any){

    const connException: ConnExceptionType = {
      conn: err,
      description: String(err),
    };

    throw (connException);
  }
}

function transformObjectToStringQuery<T>(obj: T): string{
  
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

function handlerHttpException(err: ConnExceptionType | unknown, timeout: number): void{
  
  switch(true){
    
    case err['description'] === 'timeout': {
      //console.log('HERE HERE ----------------- handlerHttpException');
      const exception = new RequestTimeoutException();

      const connException: ConnExceptionType = {
        conn: err['description'],
        description: `timeout de ${timeout/1000} segundos`,
        httpExceptionFilter: exception,
      };

      throw new RequestTimeoutException(connException);
    }

    default:{
      
      throw new InternalServerErrorException(err);
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
function buildDefaultHttpException(exceptionResponse: HttpExceptionFilterType): HttpExceptionType{
  return{
    exception: {
      statusCode: exceptionResponse.statusCode,
      error: exceptionResponse.error,
      message: getMsgExceptionFilterDefault(exceptionResponse.message),
      date: getTimeZone(new Date()),
      layer: 'CONTROLLER',
    }
  }
}


export default {
  httpCall,
  transformObjectToStringQuery,
  getTimeZone,
  handlerHttpException,
  reduceMessage,
  getMsgExceptionFilterDefault,
  buildDefaultHttpException,
}