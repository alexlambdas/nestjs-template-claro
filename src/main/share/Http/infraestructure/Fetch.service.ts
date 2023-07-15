import { CustomHttpCatchException } from "../application/CustomHttpCatch.exception";
import { PropertiesType } from "../domain/types/CustomTypes.types";
import fetch from "cross-fetch";

//
export async function fetchCustom<T>(props: PropertiesType): Promise<T>{
  const { url, httpProperties } = props;
  try {
    return (await fetch(url, httpProperties)).json();
  }
  catch (err) {
    throw new CustomHttpCatchException({ code: 500, description: String(err) });
  }
}

//
export async function timeOut(miliseconds: number): Promise<string>{

  async function timeOutHttp(ms: number): Promise<any>{
    return new Promise(resolve => setTimeout(resolve,ms));
  }

  await timeOutHttp(miliseconds);
  return 'timeout';
}

//
export function fetchData<T>(props: PropertiesType):((fx: (arg0: PropertiesType) => Promise<T>) => Promise<T>){
    
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