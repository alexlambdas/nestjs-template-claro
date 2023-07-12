//
export type fnReduceMessageType = (prev: string, current: string) => string;

//
export type HttpPropertiesType = {
  url: string;
  timeout: number;
  properties: FetchPropertiesType;
}

type FetchPropertiesType = {
  method: string;
  headers: {
    [key: string]: string
  };
  body?: any;
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
export type MetaDataType = {
  applicationName: string;
  methodName: string;
  timeout: number;
  transactionId: string;
  verb: VerbEnumType;
  urlBackEnd: string;
  bodyIn: any;
}

//
export type PayloadType = {
  bodyIn: any,
  bodyOut: any,
}


