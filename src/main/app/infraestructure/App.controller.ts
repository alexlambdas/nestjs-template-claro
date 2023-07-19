import { Body, Controller, Get, Post, Query, UseFilters, UsePipes, ValidationPipe } from "@nestjs/common";
import { HttpConfigAppService } from "../application/HttpConfigApp.service";
import { PayloadUserDto, QueryUserDto } from "../domain/dtos/User.dto";
import { ResponseDto } from "../domain/dtos/Response.dto";
import { AppService } from "../application/App.service";
import { HttpFilterException } from "./HttpFilter.exception";
import FeaturesApp from "../application/FeaturesApp";
import { ConnExceptionType } from "../domain/types/CommonTypes.types";

@Controller('/api/path/nestjs/template/users')
@UseFilters(HttpFilterException)
export class AppController{ 

  constructor(
    private readonly configApp: HttpConfigAppService, 
    private readonly appService: AppService){} 

  @Get()
  async get(@Query() bodyIn: QueryUserDto): Promise<ResponseDto>{
    try{
      return await this.appService.getApp<QueryUserDto,ResponseDto>(bodyIn);
    }
    catch(err: ConnExceptionType | unknown){ 
      FeaturesApp.handlerHttpException(err, this.configApp.getTimeOut());
    }
  }

  @Post()
  @UsePipes(ValidationPipe)
  async post(@Body() bodyIn: PayloadUserDto): Promise<ResponseDto>{
    try{
      return await this.appService.postApp<PayloadUserDto,ResponseDto>(bodyIn);
    }
    catch(err){
      FeaturesApp.handlerHttpException(err, this.configApp.getTimeOut());
    }
  }
}