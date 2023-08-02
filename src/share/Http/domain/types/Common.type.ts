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
    applicationName: string,
    transactionId: string;
    urlApi: string;
    urlBackend: string;
    backendApplicationName: string;
    backendResponse: string | any;
  }
};

export type ResponseType<T> = {
  ok: boolean;
  statusCode: number;
  statusText: string;
  data: T[] | T | FaultType | string | any;
}

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

export type LoggerConfigPropertiesType<T> = {
  configApp: ConfigAppService,
  responseType: ResponseType<T>,
  logger: any,
}

export type HttpExceptionFilterType = {
  message: string | [string];
  error: string;
  statusCode: number;
}

export type AsyncResp<T> = Promise<ResponseType<T>>;

export type FunctionFetch = <T1,T2>(props: PropsType) => AsyncResp<T1 | T2>;
