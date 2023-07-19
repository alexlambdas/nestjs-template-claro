import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";


@Injectable()
export class ConfigApp {

  //
  private payloadRequest: any;
  private payloadResponse: any;
  private transactionId: string;
  private verb: string;
  private urlApi: string;
  private timeInitConnectivity: number;
  private timeEndConnectivity: number;

  //
  private applicationName: string;
  private methodName: string;
  private timeOutHttpConnection: number;
  private breakerFailureThreshold: number;
  private breakerSuccessThreshold: number;
  private breakerTimeout: number;
  private urlBackend: string;

  //
  constructor(private configService: ConfigService) {

    this.applicationName = this.configService.get<string>('NODE_ENV_APPLICATION_NAME');
    this.methodName = this.configService.get<string>('NODE_ENV_METHOD_NAME');
    this.timeOutHttpConnection = parseInt(this.configService.get<string>('NODE_ENV_TIMEOUT_HTTP_CONNECTION'));
    this.breakerFailureThreshold = parseInt(this.configService.get<string>('NODE_ENV_CIRCUIT_BREAKER_REQUEST_FAILURE_THRESHOLD'));
    this.breakerSuccessThreshold = parseInt(this.configService.get<string>('NODE_ENV_CIRCUIT_BREAKER_REQUEST_SUCCESS_THRESHOLD'));
    this.breakerTimeout = parseInt(this.configService.get<string>('NODE_ENV_CIRCUIT_BREAKER_TIMEOUT'));
    this.urlBackend = this.configService.get<string>('NODE_ENV_HTTP_URL_BACK_END');
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
  getTimeOutHttpConnection = (): number => this.timeOutHttpConnection;
  getBreakerFailureThreshold = (): number => this.breakerFailureThreshold;
  getBreakerSuccessThreshold = (): number => this.breakerSuccessThreshold;
  getBreakerTimeout = (): number => this.breakerTimeout;
  getUrlBackend = (): string => this.urlBackend;

  /**
   * 
   * @description
   * Circuit Breaker configurations
   * 
   */

  getBreakerGreenState = (): string => "green";
  getBreakerRedState = (): string => "red";
  getBreakerYellowState = (): string => "yellow";
  getCircuitBreakerErrorDescription = (timeout: number): string => `volver a intentar despues de ${timeout / 1000} segundos`;

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