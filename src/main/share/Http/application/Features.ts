import fetch from "cross-fetch";
import { ObjResponse, Props, AsyncResp, ConfigLogger, ObjLogger, LoggerSuccess } from "../domain/types/TypeAliases";

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
    statusCode: 408,
    statusText: 'Request Timeout',
    bodyOut: `timeout de ${ms/1000} segundos`,
  };

  return fetchOut;
}

//
function curryHttpCall<T>(props: Props):((fx: (_: Props) => AsyncResp<T>) => AsyncResp<T>){
  
  const { timeout } = props;
  const fy = timeOutHttp;
  
  return async function(fx){
    const response = Promise
        .race([ fy(timeout), fx(props) ])
        .then(value => value)

    return Promise.resolve(response);
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

function loggerSuccess(props: LoggerSuccess): void{

  const configLogger: ConfigLogger = {
    configApp: props.configApp,
    isConnectivity: props.isConnectivity,
    isSuccess: props.isSuccess,
  };

  props.configApp.setTimeEnd(Date.now());
  props.configApp.setPayloadResponse(props.bodyOut);

  const loggerVO: ObjLogger = objLogger(configLogger);
  const childLogger: any = props.logger.child(loggerVO);
  childLogger.info(loggerVO.message);
}

export default {
  httpCall,
  timeOut: timeOutHttp,
  curryHttpCall,
  getTimeZone,
  objLogger,
  loggerSuccess,
}