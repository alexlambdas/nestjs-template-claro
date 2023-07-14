import { Injectable, UseInterceptors } from "@nestjs/common";
import { PayloadType, PropertiesType } from "../domain/types/CustomTypes.types";
import { CustomHttpRepository } from "../application/CustomHttp.repository";
import { FetchService } from "./Fetch.service";
import { CustomHttpCatchException } from "../application/CustomHttpCatch.exception";
import { WinstonLoggerService } from "../application/WinstonLogger.service";
import { ConfigAppHttpService } from "../application/ConfigAppHttp.service";


@Injectable()
@UseInterceptors(WinstonLoggerService)
export class CustomHttpService implements CustomHttpRepository{

  constructor(
    private configApp: ConfigAppHttpService,
    private readonly fetchService: FetchService
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

  setTimeEnd(dateNow: number): void{
    this.configApp.setTimeEnd(dateNow);
  }

  async get<OutputType>(properties: PropertiesType): Promise<OutputType>{
    this.setPayloadRequest(properties.httpProperties.body);
    const response = await this.fetchData(properties)(this.fetchService.customFetch);  
    this.setTimeEnd(Date.now());
    return response;  
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





