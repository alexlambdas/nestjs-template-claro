import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ConfigApp {

  //
  private payloadRequest: any;
  private payloadResponse: any;
  private transactionId: string;
  private verb: string;
  private urlApi: string;
  private timeInitController: number;
  private timeEndController: number;
  
  
  //
  private applicationName: string;
  private methodName: string;
  private urlBackend: string;
  private timeOut: number;
  private methodGET: string;
  private methodPOST: string;
  private methodPUT: string;
  private methodDELETE: string;


  constructor(private readonly configService: ConfigService) {

    this.applicationName = this.configService.get<string>('NODE_ENV_APPLICATION_NAME');
    this.methodName = this.configService.get<string>('NODE_ENV_METHOD_NAME');
    this.urlBackend = this.configService.get<string>('NODE_ENV_HTTP_URL_BACK_END');
    this.timeOut = parseInt(this.configService.get<string>('NODE_ENV_TIMEOUT_HTTP_CONNECTION'));
    this.methodGET = 'GET';
    this.methodPOST = 'POST';
    this.methodPUT = 'PUT';
    this.methodDELETE = 'DELETE';
  }

  /**
   * 
   * @description
   * Getters And Setter of the application
   * 
   */

  setPayloadRequest = (payloadRequest: any): void => this.payloadRequest = payloadRequest;
  setPayloadResponse = (payloadResponse: any): void => this.payloadResponse = payloadResponse;
  getPayloadRequest = (): any => this.payloadRequest;
  getPayloadResponse = (): any => this.payloadResponse;

  setTransactionId = (transactionId: string) => this.transactionId = transactionId;
  getTransactionId = (): string => this.transactionId;

  setVerb = (verb: string) => this.verb = verb;
  getVerb = (): string => this.verb;

  setUrlApi = (urlApi: string) => this.urlApi = urlApi;
  getUrlApi = (): string => this.urlApi;

  setTimeInit = (timeInitConnectivity: number) => this.timeInitController = timeInitConnectivity;
  getTimeInit = (): number => this.timeInitController;

  setTimeEnd = (timeEndConnectivity: number) => this.timeEndController = timeEndConnectivity;
  getTimeEnd = (): number => this.timeEndController;

  /**
   * 
   * @description
   * Enviroment variables of the application
   * 
   */

  getApplicationName = (): string => this.applicationName;
  getMethodName = (): string => this.methodName;
  getUrlBackend = (): string => this.urlBackend;
  getTimeOut = (): number => this.timeOut;
  getMethodGET = (): string => this.methodGET;
  getMethodPOST = (): string => this.methodPOST;
  getMethodPUT = (): string => this.methodPUT;
  getMethodDELETE = (): string => this.methodDELETE;

  /**
   * 
   * @description
   * Generic messages in the application
   * 
   */

  getGeneticErrorMessage = (): string => "error";
  getHttpErrorMessage = (): string => "error http";
  getSystemErrorHandlerMessage = (): string => "openshift";

}