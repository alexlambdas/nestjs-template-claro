import { Controller, Get, Query } from "@nestjs/common";
import { HttpConfigAppService } from "../application/HttpConfigApp.service";
import { QueryUserDto } from "../domain/dtos/User.dto";
import { ResponseDto } from "../domain/dtos/Response.dto";
import { AppService } from "../application/App.service";

@Controller('/api/path/nestjs/template/users')
export class AppController{

  constructor(
    private readonly configApp: HttpConfigAppService,
    private readonly appService: AppService){} 

  @Get()
  async get(@Query() bodyIn: QueryUserDto): Promise<ResponseDto>{
    return await this.appService.getAppService<QueryUserDto,ResponseDto>(bodyIn);
  }
}