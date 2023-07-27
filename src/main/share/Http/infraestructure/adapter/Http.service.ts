import { Injectable, UseInterceptors } from "@nestjs/common";
import { HttpRepository } from "../port/Http.repository";
import { LoggerWinstonService } from "../../application/LoggerWinston.service";
import { UpdateConfigAppService } from "../../application/UpdateConfigApp.service";
import { AsyncResp, PropsType } from "../../domain/types/Common.type";
import { ConfigAppService } from "../../application/ConfigApp.service";
import Util from "./Utilities.service";
import { FetchService } from "./Fetch.service";


@Injectable()
export class HttpService implements HttpRepository{

  //
  constructor(
    private readonly configApp: ConfigAppService,
    private readonly http: FetchService){}
  
  //
  @UseInterceptors(UpdateConfigAppService) 
  @UseInterceptors(LoggerWinstonService)
  async GET<T>(props: PropsType): AsyncResp<T>{
    
    this.configApp.setPayloadRequest(props.bodyGet);
    const fetchCall = this.http.getFunctionFetchCall();
    const fx = Util.curryHttpCall;
    const response = await fx(props)(fetchCall); 
    return response;
  }

  @UseInterceptors(UpdateConfigAppService)
  @UseInterceptors(LoggerWinstonService)
  async POST<T>(props: PropsType): AsyncResp<T>{

    this.configApp.setPayloadRequest(props.properties.body);
    const fetchCall = this.http.getFunctionFetchCall();
    const fx = Util.curryHttpCall;
    const response = await fx(props)(fetchCall); 
    return response;
  }

  @UseInterceptors(UpdateConfigAppService)
  @UseInterceptors(LoggerWinstonService)
  async PUT<T>(props: PropsType): AsyncResp<T>{

    this.configApp.setPayloadRequest(props.properties.body);
    const fetchCall = this.http.getFunctionFetchCall();
    const fx = Util.curryHttpCall;
    const response = await fx(props)(fetchCall); 
    return response;
  }

  @UseInterceptors(UpdateConfigAppService)
  @UseInterceptors(LoggerWinstonService)
  async DELETE<T>(props: PropsType): AsyncResp<T>{

    this.configApp.setPayloadRequest(props.bodyDelelete);
    const fetchCall = this.http.getFunctionFetchCall();
    const fx = Util.curryHttpCall;
    const response = await fx(props)(fetchCall); 
    return response;
  }
}










