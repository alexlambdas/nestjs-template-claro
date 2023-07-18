import { BadRequestException, InternalServerErrorException, RequestTimeoutException } from "@nestjs/common";
import { HttpPropertiesType } from "../domain/types/CommonTypes.types";
//import fetch from "cross-fetch";

//
async function httpCall<T>(httpProperties: HttpPropertiesType): Promise<T> {
  
  const { url, props } = httpProperties;
  const response = (await fetch(url, props));
  
  if(response.status >= 200 && response.status <= 299) return response.json();
  else throw ('CONNECTIVITY;ERROR_HTTP_BACKEND');
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

function handlerHttpException(err: string): void{
  
  switch(err){

    case 'CONNECTIVITY;ERROR_TIMEOUT': {
      const message: string = `timeout de ${this.configApp.getTimeOut()/1000} segundos`;
      throw new RequestTimeoutException(message);
    }

    case 'CONNECTIVITY;ERROR_HTTP_BACKEND':{
      const message: string = 'error del backend, verificar logs de la aplicacion';
      throw new BadRequestException(message);
    }

    default:
      throw new InternalServerErrorException(err);
  }
}

//
function reduceMessage(prev: string, current: string): string {
  if(prev === '') return `${current}`;
  else return `${prev} && ${current}`;
}

export default {
  httpCall,
  transformObjectToStringQuery,
  getTimeZone,
  handlerHttpException,
  reduceMessage,
}