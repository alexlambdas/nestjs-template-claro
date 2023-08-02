import { Injectable, UseInterceptors } from "@nestjs/common";
import { HttpRepository } from "../port/Http.repository";
import { UpdateConfigAppService } from "../../application/UpdateConfigApp.service";
import { AsyncResp, PropsType } from "../../domain/types/Common.type";
import { ConfigAppService } from "../../application/ConfigApp.service";
import { FetchService } from "./Fetch.service";
import { ExceptionHandlerService } from "../../application/ExceptionHandler.service";
import { ResponseType } from "../../domain/types/Common.type";
import Util from "./Utilities.service";


@Injectable()
export class HttpService<T> implements HttpRepository{ 

  //
  constructor(
    private readonly configApp: ConfigAppService<T>,
    private readonly http: FetchService<T,string>){}
  
  //
  @UseInterceptors(UpdateConfigAppService) 
  @UseInterceptors(ExceptionHandlerService)
  async GET<T1>(props: PropsType): AsyncResp<T1>{
    
    const bodyIn: T = props.bodyGet;
    this.configApp.setPayloadRequest(bodyIn);

    const fetchCall = this.http.getFunctionFetchCall();
    const curryHttpCall = Util.curryHttpCall;
    const response: ResponseType<T1> = await curryHttpCall(props)(fetchCall); 
    return response;
  }

  @UseInterceptors(UpdateConfigAppService)
  async POST<T1>(props: PropsType): AsyncResp<T1>{

    this.configApp.setPayloadRequest(props.properties.body);
    const fetchCall = this.http.getFunctionFetchCall();
    const fx = Util.curryHttpCall;
    const response = await fx(props)(fetchCall); 
    return response;
  }

  @UseInterceptors(UpdateConfigAppService)
  async PUT<T1>(props: PropsType): AsyncResp<T1>{

    this.configApp.setPayloadRequest(props.properties.body);
    const fetchCall = this.http.getFunctionFetchCall();
    const fx = Util.curryHttpCall;
    const response = await fx(props)(fetchCall); 
    return response;
  }

  @UseInterceptors(UpdateConfigAppService)
  async DELETE<T1>(props: PropsType): AsyncResp<T1>{

    this.configApp.setPayloadRequest(props.bodyDelelete);
    const fetchCall = this.http.getFunctionFetchCall();
    const fx = Util.curryHttpCall;
    const response = await fx(props)(fetchCall); 
    return response;
  }
}










