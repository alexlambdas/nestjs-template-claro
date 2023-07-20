import { ConfigApp } from "../../application/ConfigApp.service";

export type Props = {
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

export type Fault = {
  fault: {
    statusCode: number;
    error: string;
    message: string;
    date: string;
    layer: string;
    transactionId?: string;
    urlApi?: string;
    urlBackend?: string;
    responseBackend: string | any;
  }
};

export type ObjResponse<T>= {
  ok: boolean;
  statusCode: number;
  statusText: string;
  bodyOut: T | Fault | string | any;
};

export type ObjLogger = {
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

export type ConfigLogger = {
  configApp: ConfigApp,
  isSuccess: boolean,
  isConnectivity: boolean,
}

export type LoggerException = {
  configApp: ConfigApp,
  fault: Fault,
  isSuccess: boolean,
  isConnectivity: boolean,
  logger: any,
}

export type HttpExceptionFilter = {
  message: string | [string];
  error: string;
  statusCode: number;
};

export type AsyncResp<T> = Promise<ObjResponse<T>>;