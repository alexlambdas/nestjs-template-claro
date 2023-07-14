import { Controller, Get, Inject, OnModuleInit, Query } from "@nestjs/common";
import { QueryUserToDo } from "../domain/dtos/QueryUserToDo.dto";
import { UserToDoType } from "../domain/types/Custom.types";
import { ConfigService } from "@nestjs/config";
import { CustomHttpRepository, I_CUSTOM_HTTP_REPOSITORY } from "../../share/Http/application/CustomHttp.repository";
import { PropertiesType } from "src/main/share/Http/domain/types/CustomTypes.types";

@Controller('/api/path/nestjs/template')
export class AppFetchController{

  constructor(
    private configService: ConfigService,
    @Inject(I_CUSTOM_HTTP_REPOSITORY) private http: CustomHttpRepository,
    ){}

  @Get('/todos/')
  async getUserToDo(@Query() dataIn: QueryUserToDo): Promise<UserToDoType>{
    const url: string = this.configService.get<string>('NODE_ENV_HTTP_URL_BACK_END') + dataIn.id;
    const properties: PropertiesType = {
      url: url,
      timeout: 3000,
      transactionId: '123456abcd',
      httpProperties: {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    }
    return this.http.get<UserToDoType>(properties);
  }
}