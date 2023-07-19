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
};

export type Fault = {
  fault: {
    statusCode: number;
    error: string;
    message: string;
    date: string;
    layer: string;
    transactionId: string;
    urlApi: string;
    urlBackend: string;
  }
}

export type ObjResponse<T> = {
  ok: boolean;
  statusCode: number;
  statusText: string;
  bodyOut: T | Fault | string | any;
}

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
}

export type AsyncResp<T> = Promise<ObjResponse<T>>;
