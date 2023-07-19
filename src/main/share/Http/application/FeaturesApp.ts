import fetch from "cross-fetch";
import { ObjResponse, Props, AsyncResp } from "../domain/types/TypeAliases";

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

//
async function timeOutHttp<T>(ms: number): AsyncResp<T>{

  async function timeOutHttp(): Promise<any>{
    return new Promise(resolve => setTimeout(resolve,ms));
  }

  await timeOutHttp();

  const fetchOut: ObjResponse<T> = {
    ok: false,
    statusCode: 500,
    statusText: 'Internal Server Error',
    bodyOut: `timeout de ${ms/1000} segundos`,
  };

  return fetchOut;
}

//
function curryHttpCall<T>(props: Props):((fx: (_: Props) => AsyncResp<T>) => AsyncResp<T>){
  
  const { timeout } = props;
  const fy = timeOutHttp;

  return async function(fx){
    return Promise
        .race([ fy(timeout), fx(props) ])
        .then(value => value)
  }
}

//
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