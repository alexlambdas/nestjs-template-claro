import { ConfigAppService } from "../../application/ConfigApp.service";

export type PropsType = {
  url: string;
  timeout: number;
  properties: {
    method: string;
    headers: {
      [key: string]: string
    };
    body?: any;
  };
  bodyGet?:any;
  bodyDelelete?: any;
};

export type FaultType = {
  fault: {
    statusCode: number;
    error: string;
    message: string | undefined;
    date: string;
    layer: string;
    transactionId?: string;
    urlApi?: string;
    urlBackend?: string;
    backendResponse: string | any;
  }
};

export type ResponseType<T>= {
  ok: boolean;
  statusCode: number;
  statusText: string;
  data: T[] | T | string | any;
};

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
}; 

export type ConfigLoggerType = {
  configApp: ConfigAppService,
  isSuccess: boolean,
  isConnectivity: boolean,
}

export type ConfigLoggerExceptionType = {
  configApp: ConfigAppService,
  fault: FaultType,
  isSuccess: boolean,
  isConnectivity: boolean,
  logger: any,
}

export type HttpExceptionFilterType = {
  message: string | [string];
  error: string;
  statusCode: number;
};

export type AsyncResponse<T> = Promise<ResponseType<T>>;

export type AjvErrorType = {
  ok: boolean;
  message?: string;
}