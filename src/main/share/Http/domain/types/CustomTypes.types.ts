//
export type fnReduceMessageType = (prev: string, current: string) => string;

//
export type PropertiesType = {
  url: string;
  timeout: number;
  transactionId: string;
  httpProperties: {
    method: string;
    headers: {
      [key: string]: string
    };
    body?: any;
  }
}

//
export type CustomHttpCatchExceptionType = {
  code: number;
  description: string;
}

//
export type HttpExceptionType = {
  status: number;
  response: string;
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
export enum VerbEnumType {
  GET_ALL,
  GET_BY_PARAMS,
  GET_BY_ID,
  UPDATE_ONE,
  POST_ONE,
  DELETE_ONE,
}

//
export type PayloadType = {
  bodyIn: any,
  bodyOut: any,
}


