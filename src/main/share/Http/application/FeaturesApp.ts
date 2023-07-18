import { HttpPropertiesType } from "../domain/types/CommonTypes.types";
import fetch from "cross-fetch";

//
async function httpCall<T>(httpProperties: HttpPropertiesType): Promise<T>{
  const { url, props } = httpProperties;
  return (await fetch(url, props)).json();
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

    if(String(value) === 'timeout'){
      throw ('timeout');
    }
    else{
      return value;
    }
  }

  function throwCatchException(err: any): void{
    throw (String(err));
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

export default {
  httpCall,
  timeOut: timeOutHttp,
  curryHttpCall,
  getTimeZone,
}