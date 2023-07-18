import { Injectable, UseInterceptors } from "@nestjs/common";
import { HttpRepository } from "../application/Http.repository";
import { WinstonLoggerService } from "../application/WinstonLogger.service";
import { UpdateHttpConfigAppService } from "../application/UpdateHttpConfigApp.service";
import { HttpPropertiesType } from "../domain/types/CommonTypes.types";
import features from "../application/Features";


@Injectable()
export class HttpService implements HttpRepository{

  //
  constructor(){}
  
  //
  @UseInterceptors(UpdateHttpConfigAppService)
  @UseInterceptors(WinstonLoggerService)
  curryGET<T>(httpProperties: HttpPropertiesType):(fx: (_: HttpPropertiesType) => Promise<T>) => Promise<T>{
    
    const fy = features.curryHttpCall<T>;
    return async function(fx: (_: HttpPropertiesType) => Promise<T>): Promise<T>{
      return await fy(httpProperties)(fx); 
    }
  }

  @UseInterceptors(UpdateHttpConfigAppService)
  @UseInterceptors(WinstonLoggerService)
  curryPost<T>(httpProperties: HttpPropertiesType): (fx: (_: HttpPropertiesType) => Promise<T>) => Promise<T>{

    const fy = features.curryHttpCall<T>;
    return async function(fx: (_: HttpPropertiesType) => Promise<T>): Promise<T>{
      return await fy(httpProperties)(fx); 
    }
  }

  @UseInterceptors(UpdateHttpConfigAppService)
  @UseInterceptors(WinstonLoggerService)
  curryPut<T>(httpProperties: HttpPropertiesType): (fx: (_: HttpPropertiesType) => Promise<T>) => Promise<T>{

    const fy = features.curryHttpCall<T>;
    return async function(fx: (_: HttpPropertiesType) => Promise<T>): Promise<T>{
      return await fy(httpProperties)(fx); 
    }
  }

  @UseInterceptors(UpdateHttpConfigAppService)
  @UseInterceptors(WinstonLoggerService)
  curryDelete<T>(httpProperties: HttpPropertiesType): (fx: (_: HttpPropertiesType) => Promise<T>) => Promise<T>{

    const fy = features.curryHttpCall<T>;
    return async function(fx: (_: HttpPropertiesType) => Promise<T>): Promise<T>{
      return await fy(httpProperties)(fx); 
    }
  }
}










