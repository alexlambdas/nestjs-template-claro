import { Inject, Injectable, UseInterceptors } from "@nestjs/common";
import { PropertiesType } from "../domain/types/CustomTypes.types";
import { CustomHttpRepository } from "../application/CustomHttp.repository";
import { CustomHttpCatchException } from "../application/CustomHttpCatch.exception";
import { WinstonLoggerService } from "../application/WinstonLogger.service";
import { ConfigAppHttpService } from "../application/ConfigAppHttp.service";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { fetchData} from "./Fetch.service";


@Injectable()
export class HttpService implements CustomHttpRepository{

  constructor(
    private readonly configApp: ConfigAppHttpService, 
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger
  ){}

  //
  setPayloadRequest(bodyIn: any): void{
    this.configApp.setPayload({...this.configApp.getPayload(), bodyIn: bodyIn});
  }
  
  @UseInterceptors(WinstonLoggerService)
  get<T>(props: PropertiesType):(fx: (args0: PropertiesType) => Promise<T>) => Promise<T>{

    const fy = fetchData<T>;
    this.setPayloadRequest(props.httpProperties.body);

    return async function(fx: (arg0: PropertiesType) => Promise<T>): Promise<T>{
      return await fy(props)(fx); 
    } 
  }
}










