import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import ConfigAppDefault from "./ConfigApp.default";
import { ResponseType } from "../domain/types/Common.type";


@Injectable()
export class ConfigAppService {

  //
  private payloadRequest: any;
  private payloadResponse: ResponseType<any>;
  private transactionId: string;
  private verb: string;
  private urlApi: string;
  private timeInitConnectivity: number;
  private timeEndConnectivity: number;

  //
  private applicationName: string;
  private methodName: string;
  private timeOutHttpConnection: number;
  private backendApplicationName: string;
  private urlBackend: string;

  //
  constructor(private configService: ConfigService) {

    let env: string | undefined;

    env = this.configService.get<string>('ENV_APP_NAME');
    if(typeof env === 'string') this.applicationName = env;
    else this.applicationName = ConfigAppDefault.ENV_APP_NAME;

    env = this.configService.get<string>('ENV_METHOD_NAME');
    if(typeof env === 'string') this.methodName = env;
    else this.methodName = ConfigAppDefault.ENV_METHOD_NAME;

    env = this.configService.get<string>('ENV_TIMEOUT_HTTP');
    if(typeof env === 'string') this.timeOutHttpConnection = parseInt(env);
    else this.timeOutHttpConnection = parseInt(ConfigAppDefault.ENV_TIMEOUT_HTTP);
    
    env = this.configService.get<string>('ENV_BACKEND_APP_NAME');
    if(typeof env === 'string') this.backendApplicationName = env;
    else this.backendApplicationName = ConfigAppDefault.ENV_BACKEND_APP_NAME;

    env = this.configService.get<string>('ENV_URL_BACKEND');
    if(typeof env === 'string') this.urlBackend = env;
    else this.urlBackend = ConfigAppDefault.ENV_URL_BACKEND;

  }

  /**
   * 
   * @description
   * Getters And Setter of the application
   * 
   */

  setPayloadRequest = (payloadRequest: any): void => {this.payloadRequest = payloadRequest};
  getPayloadRequest = (): any => this.payloadRequest;

  setPayloadResponse = (payloadResponse: ResponseType<any>): void => {this.payloadResponse = payloadResponse;}
  getPayloadResponse = (): ResponseType<any> => this.payloadResponse;

  setTransactionId = (transactionId: string) => this.transactionId = transactionId;
  getTransactionId = (): string => this.transactionId;

  setVerb = (verb: string) => this.verb = verb;
  getVerb = (): string => this.verb;

  setUrlApi = (urlApi: string) => this.urlApi = urlApi;
  getUrlApi = (): string => this.urlApi;

  setTimeInit = (timeInitConnectivity: number) => this.timeInitConnectivity = timeInitConnectivity;
  getTimeInit = (): number => this.timeInitConnectivity;

  setTimeEnd = (timeEndConnectivity: number) => this.timeEndConnectivity = timeEndConnectivity;
  getTimeEnd = (): number => this.timeEndConnectivity;

  /**
   * 
   * @description
   * Enviroment variables of the application
   * 
   */

  getApplicationName = (): string => this.applicationName;
  getMethodName = (): string => this.methodName;
  getUrlBackend = (): string => this.urlBackend;
  getTimeOut = (): number => this.timeOutHttpConnection;
  getBackendApplicationName = (): string => this.backendApplicationName;

  /**
   * 
   * @description
   * Generic messages in the application
   * 
   */

  getLevelInfo = (): string => 'Info';
  getLayerConnectivity = (): string => 'Connectivity';
  getMessageSuccess = (): string => 'Success';
}