import { Controller, Get, HttpException, Query, UseFilters } from "@nestjs/common";
import { ConfigAppService } from "../application/ConfigApp.service";
import { QueryUserDto, UserDto } from "../domain/dtos/User.dto";
import { ResponseDto } from "../domain/dtos/Response.dto";
import { AppService } from "../application/App.service";
import { HttpFilterException } from "./HttpFilter.exception";
import Features from "../application/Features";
import { ResponseType } from "../domain/types/TypeAliases";
import { FaultDto } from "../domain/dtos/Fault.dto";


@Controller('/api/path/nestjs/template/users')
@UseFilters(HttpFilterException)
export class AppController{ 

  constructor(private readonly appService: AppService){} 

  @Get('/')
  async get(@Query() bodyIn: QueryUserDto): Promise<ResponseDto<UserDto>>{
    try{
      return await this.appService.getApp<QueryUserDto,UserDto>(bodyIn);
    }
    catch(err: ResponseType<any> | any){
      const httpException: HttpException = Features.handlerException<FaultDto>(err);
      throw httpException;
    }
  }
}