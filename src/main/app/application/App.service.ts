import { HttpRepository, I_HTTP_REPOSITORY } from "src/main/share/Http/application/Http.repository";
import { FnHttpCallType, HttpPropertiesType } from "../domain/types/CommonTypes.types";
import { HttpConfigAppService } from "./HttpConfigApp.service";
import { Inject, Injectable } from "@nestjs/common";
import FeaturesApp from "./FeaturesApp";

@Injectable()
export class AppService {

  constructor(
    private readonly configApp: HttpConfigAppService,
    @Inject(I_HTTP_REPOSITORY) private readonly httpRepository: HttpRepository){}

  async getApp<T1,T2>(bodyIn: T1): Promise<T2>{

    const httpCall: FnHttpCallType = FeaturesApp.httpCall;
    const url: string = this.configApp.getUrlBackend() + FeaturesApp.transformObjectToStringQuery(bodyIn);

    const httpProperties: HttpPropertiesType = {
      url: url,
      timeout: this.configApp.getTimeOut(),
      props: {
        method: this.configApp.getMethodGET(),
        headers: {
          'Content-Type': 'application/json',
          'transactionid': this.configApp.getTransactionId(),
        },
      }
    };

    return await this.httpRepository.curryGET<T2>(httpProperties)(httpCall);
  }

  async postApp<T1,T2>(bodyIn: T1): Promise<T2>{

    const httpCall: FnHttpCallType = FeaturesApp.httpCall;

    const httpProperties: HttpPropertiesType = {
      url: this.configApp.getUrlBackend(),
      timeout: this.configApp.getTimeOut(),
      props: {
        method: this.configApp.getMethodPOST(),
        headers: {
          'Content-Type': 'application/json',
          'transactionid': this.configApp.getTransactionId(),
        },
        body: JSON.stringify(bodyIn),
      }
    };

    return await this.httpRepository.curryPost<T2>(httpProperties)(httpCall);
  }

}