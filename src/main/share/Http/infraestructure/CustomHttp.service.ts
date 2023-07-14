import { Inject, Injectable, UseInterceptors } from "@nestjs/common";
import { PayloadType, PropertiesType } from "../domain/types/CustomTypes.types";
import { CustomHttpRepository } from "../application/CustomHttp.repository";
import { FetchService } from "./Fetch.service";
import { CustomHttpCatchException } from "../application/CustomHttpCatch.exception";
import { WinstonLoggerService } from "../application/WinstonLogger.service";
import { ConfigAppHttpService } from "../application/ConfigAppHttp.service";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";


@Injectable()
export class CustomHttpService implements CustomHttpRepository{

  constructor(
    private readonly configApp: ConfigAppHttpService,
    private readonly fetchService: FetchService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger
    ){}

  /**
   * 
   * @param miliseconds 
   * number,
   * 
   * @returns 
   * Promise<string>
   * 
   */
  async timeOut(miliseconds: number): Promise<string>{

    async function timeOutHttp(ms: number): Promise<any>{
      return new Promise(resolve => setTimeout(resolve,ms));
    }

    await timeOutHttp(miliseconds);
    return 'timeout';
  }

  /**
   * 
   * @param properties 
   * PropertiesType,
   * 
   * @returns 
   * Function, (arg0: PropertiesType) => Promise<OutputType>
   * 
   */
  fetchData<OutputType>(properties: PropertiesType){
    
    const { timeout } = properties;
    const fx = this.timeOut;

    function handlerOfPromise(value: any): any{
      if(typeof value === 'string') throw new Error(`timeout de ${timeout/1000} segundos`);
      else return value;
    }

    function throwCatchException(err: string): void{
      throw new CustomHttpCatchException({code: 500, description: String(err)})
    }

    return async function(fy: (arg0: PropertiesType) => Promise<OutputType>){
      return Promise
          .race([ fx(timeout), fy(properties) ])
          .then(value => handlerOfPromise(value))
          .catch(err => throwCatchException(err))
    }
  }

  setPayloadRequest(bodyIn: any): void{
    let objPayload: PayloadType = this.configApp.getPayload();
    this.configApp.setPayload({...objPayload, bodyIn: bodyIn});
  }

  @UseInterceptors(WinstonLoggerService)
  async get<OutputType>(properties: PropertiesType): Promise<OutputType>{
    this.setPayloadRequest(properties.httpProperties.body);
    return this.fetchData(properties)(this.fetchService.customFetch);   
  }

  async post<OutputType>(properties: PropertiesType): Promise<OutputType>{
    return this.fetchData(properties)(this.fetchService.customFetch);
  }

  async put<OutputType>(properties: PropertiesType): Promise<OutputType>{
    return this.fetchData(properties)(this.fetchService.customFetch);
  }
  async delete<OutputType>(properties: PropertiesType): Promise<OutputType>{
    return this.fetchData(properties)(this.fetchService.customFetch);
  }
}





