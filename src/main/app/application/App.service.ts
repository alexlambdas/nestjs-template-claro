import { HttpRepository, I_HTTP_REPOSITORY } from "src/main/share/Http/application/Http.repository";
import { ObjResponse, Props } from "../domain/types/TypeAliases";
import { ConfigApp } from "./ConfigApp.service";
import { Inject, Injectable } from "@nestjs/common";
import Features from "./Features";

@Injectable()
export class AppService {

  constructor(
    private readonly configApp: ConfigApp,
    @Inject(I_HTTP_REPOSITORY) private readonly http: HttpRepository){}

  async getApp<T1,T2>(bodyIn: T1): Promise<T2>{

    const httpCall = Features.httpCall;
    const url: string = this.configApp.getUrlBackend() + Features.objToStringQuery(bodyIn);

    const props: Props = {
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

    const response: ObjResponse<T1> = await this.http.curryGET<T1>(props)(httpCall);
    console.log(response);
    if(response.ok) return response.bodyOut;
    else throw (response);
  }

  async postApp<T1,T2>(bodyIn: T1): Promise<T2>{

    const httpCall = Features.httpCall;

    const props: Props = {
      url: this.configApp.getUrlBackend(),
      timeout: this.configApp.getTimeOut(),
      properties: {
        method: this.configApp.getMethodPOST(),
        headers: {
          'Content-Type': 'application/json',
          'transactionid': this.configApp.getTransactionId(),
        },
        body: JSON.stringify(bodyIn),
      }
    };

    const response: ObjResponse<T1> = await this.http.curryPost<T1>(props)(httpCall);

    if(response.ok) return response.bodyOut;
    else throw (response);
  }

}