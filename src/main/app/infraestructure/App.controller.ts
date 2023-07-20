import { Body, Controller, Get, Post, Query, UseFilters, UsePipes, ValidationPipe } from "@nestjs/common";
import { ConfigApp } from "../application/ConfigApp.service";
import { PayloadUserDto, QueryUserDto } from "../domain/dtos/User.dto";
import { ResponseDto } from "../domain/dtos/Response.dto";
import { AppService } from "../application/App.service";
import { HttpFilterException } from "./HttpFilter.exception";
import Features from "../application/Features";
import { ObjResponse } from "../domain/types/TypeAliases";


@Controller('/api/path/nestjs/template/users')
@UseFilters(HttpFilterException)
export class AppController{ 

  constructor(
    private readonly configApp: ConfigApp, 
    private readonly appService: AppService){} 

  @Get()
  async get(@Query() bodyIn: QueryUserDto): Promise<ResponseDto>{
    try{
      return await this.appService.getApp<QueryUserDto,ResponseDto>(bodyIn);
    }
    catch(err: ObjResponse<QueryUserDto> | any){ 
      Features.handlerException(err, this.configApp);
    }
  }

  @Post()
  @UsePipes(ValidationPipe)
  async post(@Body() bodyIn: PayloadUserDto): Promise<ResponseDto>{
    try{
      return await this.appService.postApp<PayloadUserDto,ResponseDto>(bodyIn);
    }
    catch(err: ObjResponse<QueryUserDto> | any){
      Features.handlerException(err, this.configApp);
    }
  }
}