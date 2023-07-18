import { HttpCatchException } from "./HttpCatch.exception";
import { FaultDto } from "../domain/dtos/Fault.dto";
import { HttpPropertiesType, errorObjectPropertiesType } from "../domain/types/CommonTypes.types";
import fetch from "cross-fetch";

//
async function httpCall<T>(httpProperties: HttpPropertiesType): Promise<T>{
  const { url, props } = httpProperties;
  try {
    return (await fetch(url, props)).json();
  }
  catch (err) {
    throw new HttpCatchException({ code: 500, description: String(err) });
  }
}

//
async function timeOutHttp(miliseconds: number): Promise<string>{

  async function timeOutHttp(): Promise<any>{
    return new Promise(resolve => setTimeout(resolve,miliseconds));
  }

  await timeOutHttp();
  return 'timeout';
}

//
function curryHttpCall<T>(props: HttpPropertiesType):((fx: (_: HttpPropertiesType) => Promise<T>) => Promise<T>){
  
  const { timeout } = props;
  const fy = timeOutHttp;

  function handlerOfPromise(value: any): any{
    if(typeof value === 'string') throw new Error(`timeout de ${timeout/1000} segundos`);
    else return value;
  }

  function throwCatchException(err: string): void{
    console.log(err);
    throw new Error(String(err));
  }

  
  return async function(fx){
    return Promise
        .race([ fy(timeout), fx(props) ])
        .then(value => handlerOfPromise(value))
        .catch(err => throwCatchException(err))
  }
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

function reduceMessage(prev: string, current: string): string {
  return `${prev} && ${current}`
}

//
function createErrorObject(objProperties: errorObjectPropertiesType): FaultDto{

  const {internalFault, urlApi, fnReduceMessage} = objProperties;

  return {
    fault: {
      transactionId: undefined,
      timeStamp: (new Date()).toISOString(),
      httpStatusCode: internalFault.statusCode,
      message: "error",
      layer: "CONTROLLER",
      urlApi: urlApi,
      urlBackend: process.env.NODE_ENV_HTTP_URL_BACK_END,
      detailException: {
        systemErrorHandler: "openshift",
        originSystemError: "openshift",
        originSystemErrorCode: (internalFault.statusCode).toString(),
        originSystemErrorMessage: internalFault.error,
        originSystemErrorDescription: Array.isArray(internalFault.message) ? (
          internalFault.message.reduce(fnReduceMessage)
        ) : (
          internalFault.message
        ),
      }
    }
  };
}

export default {
  httpCall,
  timeOut: timeOutHttp,
  curryHttpCall,
  getTimeZone,
  reduceMessage,
  createErrorObject
}