import { Injectable } from "@nestjs/common";
import { FetchPropertiesType } from "../../domain/types/CustomTypes.types";
import fetch from "cross-fetch";


@Injectable()
export class HttpFetchService{

  constructor(){}


  public async customFetch(url: string, properties: FetchPropertiesType): Promise<any>{
    return (await fetch(url,properties)).json();
  }


  public async customSetTimeOut(miliseconds: number): Promise<any>{
    return new Promise((resolve,_) => setTimeout(() => resolve('timeout'),miliseconds));
  }


  public customFetchAndTimeout(url: string, properties: FetchPropertiesType, timeout: number){
    
    const fnCustomSetTimeOut = this.customSetTimeOut;

    return async function(fnCustomFetch: (url: string, properties: FetchPropertiesType) => any){
      return await Promise.race([
        fnCustomFetch(url,properties),
        fnCustomSetTimeOut(timeout),
      ]);
    }
  }


  public fetchData(url: string, properties: FetchPropertiesType, timeout: number){

    const fnCustomFetchAndTimeout = this.customFetchAndTimeout(url,properties,timeout);

    return async function(fnCustomFetch: (url: string, properties: FetchPropertiesType) => any){
      try{ 
        return await (fnCustomFetchAndTimeout)(fnCustomFetch); 
      }
      catch(err){ 
        return new Error(err); 
      }
    }
  }
}





