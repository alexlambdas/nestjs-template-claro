import { Inject, Injectable, UseInterceptors } from "@nestjs/common";
import { PropertiesType } from "../domain/types/Types.types";
import { HttpRepository } from "../application/Http.repository";
import { HttpCatchException } from "../application/HttpCatch.exception";
import { WinstonLoggerService } from "../application/WinstonLogger.service";
import { HttpConfigAppService } from "../application/HttpConfigApp.service";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import features from "../application/Features";


@Injectable()
export class HttpService implements HttpRepository{

  constructor(
    private readonly configApp: HttpConfigAppService, 
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger
  ){}

  //
  setPayloadRequest(bodyIn: any): void{
    this.configApp.setPayload({...this.configApp.getPayload(), bodyIn: bodyIn});
  }
  
  @UseInterceptors(WinstonLoggerService)
  curryGET<T>(props: PropertiesType):(fx: (_: PropertiesType) => Promise<T>) => Promise<T>{

    const fy = features.curryFetch<T>;
    this.setPayloadRequest(props.httpProperties.body);

    return async function(fx: (_: PropertiesType) => Promise<T>): Promise<T>{
      return await fy(props)(fx); 
    } 
  }
}










