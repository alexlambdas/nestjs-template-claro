//
export type HttpPropertiesType = {
  url: string;
  timeout: number;
  props: {
    method: string;
    headers: {
      [key: string]: string
    };
    body?: any;
  }
}

//
export type HttpExceptionFilterType = {
  message: string | [string];
  error: string;
  statusCode: number;
}

//
export type HttpExceptionType = {
  exception: {
    statusCode: number;
    error: string;
    message: string;
    date: string;
    layer: string;
    transactionId?: string;
    urlApi?: string;
    urlBackend?: string;
  }
}

//
export type LoggerType = {
  applicationName: string;
  methodName: string;
  verb: string;
  transactionId: string;
  level: string;
  layer: string;
  message: string;
  processingTime: number;
  timestamp: string;
  urlApi?: string;
  urlBackend?: string;
  request: any;
  response: any;
  type?: string;
}

//
export type errorObjectPropertiesType = {
  internalFault: any,
  urlApi: string,
  fnReduceMessage: (prev: string, current:string) => string,
}

//
export type FnHttpCallType = <T>(_: HttpPropertiesType) => Promise<T>;