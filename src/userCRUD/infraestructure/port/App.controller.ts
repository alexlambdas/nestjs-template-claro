import { Controller, Get, HttpException, Query, UseFilters } from "@nestjs/common";
import { ConfigAppService } from "../../application/ConfigApp.service";
import { QueryUserDto, UserDto } from "../../domain/dtos/User.dto";
import { ResponseDto } from "../../domain/dtos/Response.dto";
import { AppService } from "../../application/App.service";
import { HttpFilterException } from "../adapter/HttpFilter.exception";
import Features from "../../application/Utilities.service";
import { ResponseType } from "../../domain/types/Common.type";
import { FaultDto } from "../../domain/dtos/Fault.dto";


@Controller('/api/path/nestjs/template/jsonplaceholder/users')
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