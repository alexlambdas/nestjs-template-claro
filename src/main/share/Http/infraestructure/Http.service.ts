import { Injectable, UseInterceptors } from "@nestjs/common";
import { HttpRepository } from "../application/Http.repository";
import { LoggerWinston } from "../application/LoggerWinston.service";
import { UpdateConfigApp } from "../application/UpdateConfigApp.service";
import { AsyncResp, Props } from "../domain/types/TypeAliases";
import FeaturesApp from "../application/FeaturesApp"; 


@Injectable()
export class HttpService implements HttpRepository{

  //
  constructor(){}
  
  //
  @UseInterceptors(UpdateConfigApp)
  @UseInterceptors(LoggerWinston)
  curryGET<T>(props: Props):(fx: (_: Props) => AsyncResp<T>) => AsyncResp<T>{
    
    const fy = FeaturesApp.curryHttpCall;
    return async function(fx){
      return await fy(props)(fx); 
    }
  }

  @UseInterceptors(UpdateConfigApp)
  @UseInterceptors(LoggerWinston)
  curryPost<T>(props: Props):(fx: (_: Props) => AsyncResp<T>) => AsyncResp<T>{

    const fy = FeaturesApp.curryHttpCall;
    return async function(fx){
      return await fy(props)(fx); 
    }
  }

  @UseInterceptors(UpdateConfigApp)
  @UseInterceptors(LoggerWinston)
  curryPut<T>(props: Props):(fx: (_: Props) => AsyncResp<T>) => AsyncResp<T>{

    const fy = FeaturesApp.curryHttpCall;
    return async function(fx){
      return await fy(props)(fx); 
    }
  }

  @UseInterceptors(UpdateConfigApp)
  @UseInterceptors(LoggerWinston)
  curryDelete<T>(props: Props):(fx: (_: Props) => AsyncResp<T>) => AsyncResp<T>{

    const fy = FeaturesApp.curryHttpCall;
    return async function(fx){
      return await fy(props)(fx); 
    }
  }
}










