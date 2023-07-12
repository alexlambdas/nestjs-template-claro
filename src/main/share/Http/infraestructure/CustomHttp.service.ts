import { Injectable } from "@nestjs/common";
import { HttpPropertiesType } from "../domain/types/CustomTypes.types";
import fetch from "cross-fetch";
import { CustomHttpCatchException } from "../application/CustomHttpCatch.exception";
import { CustomHttpRepository } from "../application/CustomHttp.repository";


@Injectable()
export class CustomHttpService implements CustomHttpRepository{

  constructor(){}
  
  async customFetch(httpProperties: HttpPropertiesType): Promise<any>{
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


  customFetchAndTimeout(httpProperties: HttpPropertiesType){
    
    const { timeout } = httpProperties;
    const fnCustomSetTimeOut = this.customSetTimeOut;

    return async function(fnCustomFetch: (httpProperties: HttpPropertiesType) => any){
      return await Promise.race([
        fnCustomFetch(httpProperties),
        fnCustomSetTimeOut(timeout),
      ]);
    }
  }


  fetchData(httpProperties: HttpPropertiesType){

    const fnCustomFetchAndTimeout = this.customFetchAndTimeout(httpProperties);

    return async function(fnCustomFetch: (httpProperties: HttpPropertiesType) => any){
      try{ 
        return await (fnCustomFetchAndTimeout)(fnCustomFetch); 
      }
      catch(err){ 
        return new Error(err); 
      }
    }
  }

  async get<OutputType>(httpPropertiesType: HttpPropertiesType): Promise<OutputType>{

  }

  async post<OutputType>(httpPropertiesType: HttpPropertiesType): Promise<OutputType>{

  };

  async put<OutputType>(httpPropertiesType: HttpPropertiesType): Promise<OutputType>{

  }
  async delete<OutputType>(httpPropertiesType: HttpPropertiesType): Promise<OutputType>{

  }
}





