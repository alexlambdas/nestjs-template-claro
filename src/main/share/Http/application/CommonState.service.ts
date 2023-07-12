import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MetaDataType, PayloadType } from "../domain/types/CustomTypes.types";



@Injectable()
export class CommonStateService{

    //
    private controllerPayload: PayloadType;
    private connectionPayload: PayloadType;
    private transactionId: string;
    private verb: string;
    private urlBackend: string;
    private timeInitController: number;
    private timeEndController: number;
    private timeInitConnectivity: number;
    private timeEndConnectivity: number;
    private metaDataType: MetaDataType;

    //
    constructor(private configService: ConfigService){}

    /**
     * 
     * @description
     * Getters And Setter of the application
     * 
     */

    setControllerPayload = (obj: PayloadType) => this.controllerPayload = {...obj};
    getControllerPayload = (): PayloadType => this.controllerPayload;

    setConnectionLayer = (obj: PayloadType) => this.connectionPayload = {...obj};
    getConnectionLayer = (): PayloadType => this.connectionPayload;

    setTransactionId = (transactionId: string) => this.transactionId = transactionId;
    getTransactionId = (): string => this.transactionId;

    setVerb = (verb: string) => this.verb = verb;
    getVerb = (): string => this.verb;

    setUrlBackend = (urlBackend: string) => this.urlBackend = urlBackend;
    getUrlBackend = (): string => this.urlBackend;

    setTimeInitController = (timeInitController: number) => this.timeInitController = timeInitController;
    getTimeInitController = (): number => this.timeInitController;

    setTimeEndController = (timeEndController: number) => this.timeEndController = timeEndController;
    getTimeEndController = (): number => this.timeEndController;

    setTimeInitConnectivity = (timeInitConnectivity: number) => this.timeInitConnectivity = timeInitConnectivity;
    getTimeInitConnectivity = (): number => this.timeInitConnectivity;

    setTimeEndConnectivity = (timeEndConnectivity: number) => this.timeEndConnectivity = timeEndConnectivity;
    getTimeEndConnectivity = (): number => this.timeEndConnectivity;

    setMetaDataType = (metaDataType: MetaDataType) => this.metaDataType = {...metaDataType};
    getMetaDataType = (): MetaDataType => this.metaDataType;


    /**
     * 
     * @description
     * Circuit Breaker configurations
     * 
     */

    getBreakerGreenState = ():string => "green";
    getBreakerRedState = (): string => "red";
    getBreakerYellowState = (): string => "yellow";
    getCircuitBreakerErrorDescription = (timeout: number): string => `volver a intentar despues de ${timeout/1000} segundos`;

    /**
     * 
     * @description
     * Generic messages in the application
     * 
     */

    getGeneticErrorMessage = (): string => "error";
    getHttpErrorMessage = (): string => "error http";
    getSystemErrorHandlerMessage = (): string => "openshift";

    /**
     * 
     * @description
     * Enviroment variables of the application
     * 
     */

    getApplicationName = (): string => this.configService.get<string>('NODE_ENV_APPLICATION_NAME');
    getMethodName = (): string => this.configService.get<string>('NODE_ENV_METHOD_NAME');
    getTimeOutHttpConnection = (): number => parseInt(this.configService.get<string>('NODE_ENV_TIMEOUT_HTTP_CONNECTION'));
    getBreakerFailureThreshold = (): number => parseInt(this.configService.get<string>('NODE_ENV_CIRCUIT_BREAKER_REQUEST_FAILURE_THRESHOLD'));
    getBreakerSuccessThreshold = (): number => parseInt(this.configService.get<string>('NODE_ENV_CIRCUIT_BREAKER_REQUEST_SUCCESS_THRESHOLD'));
    getBreakerTimeout = (): number => parseInt(this.configService.get<string>('NODE_ENV_CIRCUIT_BREAKER_TIMEOUT'));
}