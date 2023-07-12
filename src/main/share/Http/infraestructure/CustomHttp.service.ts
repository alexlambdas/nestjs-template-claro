import { Injectable } from "@nestjs/common";
import { HttpPropertiesType } from "../domain/types/CustomTypes.types";
import fetch from "cross-fetch";
import { CustomHttpCatchException } from "../application/CustomHttpCatch.exception";
import { CustomHttpRepository } from "../application/CustomHttp.repository";


@Injectable()
export class CustomHttpService implements CustomHttpRepository{

  constructor(){}
  
  async customFetch<OutputType>(httpProperties: HttpPropertiesType): Promise<OutputType>{
    const {url, properties } = httpProperties;
    try{
      return (await fetch(url,properties)).json();
    }
    catch(err){
      throw new CustomHttpCatchException({ code: 500, description: err.toString()});
    }
  }


  async customSetTimeOut(miliseconds: number): Promise<any>{
    return new Promise((resolve,_) => setTimeout(() => resolve('timeout'),miliseconds));
  }


  customFetchAndTimeout<OutputType>(httpProperties: HttpPropertiesType){
    
    const { timeout } = httpProperties;
    const fnCustomSetTimeOut = this.customSetTimeOut;

    return async function(fnCustomFetch: (httpProperties: HttpPropertiesType) => Promise<OutputType>){
      return await Promise.race([
        fnCustomFetch(httpProperties),
        fnCustomSetTimeOut(timeout),
      ]);
    }
  }


  fetchData<OutputType>(httpProperties: HttpPropertiesType){

    const fnCustomFetchAndTimeout = this.customFetchAndTimeout(httpProperties);

    return async function(fnCustomFetch: (httpProperties: HttpPropertiesType) => Promise<OutputType>){
      try{ 
        return await (fnCustomFetchAndTimeout)(fnCustomFetch); 
      }
      catch(err){ 
        return new Error(err); 
      }
    }
  }

  async get<OutputType>(httpProperties: HttpPropertiesType): Promise<OutputType>{
    return await this.fetchData(httpProperties)(this.customFetch);
  }

  async post<OutputType>(httpProperties: HttpPropertiesType): Promise<OutputType>{
    return await this.fetchData(httpProperties)(this.customFetch);
  };

  async put<OutputType>(httpProperties: HttpPropertiesType): Promise<OutputType>{
    return await this.fetchData(httpProperties)(this.customFetch);
  }
  async delete<OutputType>(httpProperties: HttpPropertiesType): Promise<OutputType>{
    return await this.fetchData(httpProperties)(this.customFetch);
  }
}





