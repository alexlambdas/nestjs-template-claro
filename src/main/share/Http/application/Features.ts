import { HttpCatchException } from "./HttpCatch.exception";
import { FaultDto } from "../domain/dtos/Fault.dto";
import { PropertiesType, errorObjectPropertiesType } from "../domain/types/Types.types";
import fetch from "cross-fetch";

//
async function httpCall<T>(props: PropertiesType): Promise<T>{
  const { url, httpProperties } = props;
  try {
    return (await fetch(url, httpProperties)).json();
  }
  catch (err) {
    throw new HttpCatchException({ code: 500, description: String(err) });
  }
}

//
async function timeOut(miliseconds: number): Promise<string>{

  async function timeOutHttp(ms: number): Promise<any>{
    return new Promise(resolve => setTimeout(resolve,ms));
  }

  await timeOutHttp(miliseconds);
  return 'timeout';
}

//
function curryFetch<T>(props: PropertiesType):((fx: (_: PropertiesType) => Promise<T>) => Promise<T>){
    
  const { timeout } = props;
  const fy = timeOut;

  function handlerOfPromise(value: any): any{
    if(typeof value === 'string') throw new Error(`timeout de ${timeout/1000} segundos`);
    else return value;
  }

  function throwCatchException(err: string): void{
    throw new Error('timeout')
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
  timeOut,
  curryFetch,
  getTimeZone,
  reduceMessage,
  createErrorObject
}