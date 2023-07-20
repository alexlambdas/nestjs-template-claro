import { Injectable, UseInterceptors } from "@nestjs/common";
import { HttpRepository } from "../application/Http.repository";
import { LoggerWinston } from "../application/LoggerWinston.service";
import { UpdateConfigApp } from "../application/UpdateConfigApp.service";
import { AsyncResp, Props } from "../domain/types/TypeAliases";
import { ConfigApp } from "../application/ConfigApp.service";
import Features from "../application/Features";


@Injectable()
export class HttpService implements HttpRepository{

  //
  constructor(private readonly configApp: ConfigApp){}
  
  //
  @UseInterceptors(UpdateConfigApp) 
  @UseInterceptors(LoggerWinston)
  curryGET<T>(props: Props):(fx: (_: Props) => AsyncResp<T>) => AsyncResp<T>{
    
    this.configApp.setPayloadRequest(props.bodyGet);
    const fy = Features.curryHttpCall;
    return async function(fx){
      return await fy(props)(fx); 
    }
  }

  @UseInterceptors(UpdateConfigApp)
  @UseInterceptors(LoggerWinston)
  curryPost<T>(props: Props):(fx: (_: Props) => AsyncResp<T>) => AsyncResp<T>{

    this.configApp.setPayloadRequest(props.properties.body);
    const fy = Features.curryHttpCall;
    return async function(fx){
      return await fy(props)(fx); 
    }
  }

  @UseInterceptors(UpdateConfigApp)
  @UseInterceptors(LoggerWinston)
  curryPut<T>(props: Props):(fx: (_: Props) => AsyncResp<T>) => AsyncResp<T>{

    this.configApp.setPayloadRequest(props.properties.body);
    const fy = Features.curryHttpCall;
    return async function(fx){
      return await fy(props)(fx); 
    }
  }

  @UseInterceptors(UpdateConfigApp)
  @UseInterceptors(LoggerWinston)
  curryDelete<T>(props: Props):(fx: (_: Props) => AsyncResp<T>) => AsyncResp<T>{

    this.configApp.setPayloadRequest(props.bodyDelelete);
    const fy = Features.curryHttpCall;
    return async function(fx){
      return await fy(props)(fx); 
    }
  }
}










