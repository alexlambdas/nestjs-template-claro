import { Injectable } from "@nestjs/common";
import { PropertiesType } from "../domain/types/CustomTypes.types";
import { CustomHttpRepository } from "../application/CustomHttp.repository";
import { FetchService } from "./Fetch.service";
import { CustomHttpCatchException } from "../application/CustomHttpCatch.exception";


@Injectable()
export class CustomHttpService implements CustomHttpRepository{

  constructor(private readonly fetchService: FetchService){}

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

  async get<OutputType>(properties: PropertiesType): Promise<OutputType>{
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





