import { HttpRepository, I_HTTP_REPOSITORY } from "src/main/share/Http/infraestructure/port/Http.repository";
import { ResponseType, PropsType, AjvErrorType } from "../domain/types/TypeAliases";
import { ConfigAppService } from "./ConfigApp.service";
import { Inject, Injectable } from "@nestjs/common";
import Features from "./Features";
import { fnUserSchemaErrorValidation } from "../domain/schemas/User.schema";

@Injectable()
export class AppService {

  constructor(
    private readonly configApp: ConfigAppService,
    @Inject(I_HTTP_REPOSITORY) private readonly http: HttpRepository){}

  async getApp<T1 extends object,T2>(bodyIn: T1): Promise<ResponseType<T2>>{

    const url: string = this.configApp.getUrlBackend() + Features.objToStringQuery(bodyIn);

    const props: PropsType = {
      url: url,
      timeout: this.configApp.getTimeOut(), 
      properties: {
        method: this.configApp.getMethodGET(),
        headers: {
          'Content-Type': 'application/json',
          'transactionid': this.configApp.getTransactionId(),
        },
      },
      bodyGet: bodyIn,
    };
 
    const response: ResponseType<T2> = await this.http.GET<T1>(props);
    const isAValidationResponseOk: boolean = fnUserSchemaErrorValidation(response.data[0]);
    const isAControlledFault: boolean = typeof response.data.fault === 'object';
    this.configApp.setPayloadResponse(response);
    
    if(!response.ok){
      throw (response);
    }

    if(isAControlledFault){

      const ajvError: AjvErrorType = {
        ok: true,
        message: undefined,
      };
      this.configApp.setAjvError(ajvError);
      throw (response);

    }

    if(!isAValidationResponseOk){
      
      const isANullArray: boolean = fnUserSchemaErrorValidation.errors?.length === null;
      const isAnUndefinedArray: boolean = fnUserSchemaErrorValidation.errors?.length === undefined;
      const validate: boolean = isANullArray || isAnUndefinedArray;

      const ajvError: AjvErrorType = {
        ok: false,
        message: validate ? 'error validation' : fnUserSchemaErrorValidation.errors?.[0].message,
      };
      this.configApp.setAjvError(ajvError);
      throw (response);
    }
    
    return response;
  }
}