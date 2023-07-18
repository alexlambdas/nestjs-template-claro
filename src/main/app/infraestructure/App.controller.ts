import { Controller, Get, HttpException, HttpStatus, InternalServerErrorException, Query, RequestTimeoutException, UseFilters } from "@nestjs/common";
import { HttpConfigAppService } from "../application/HttpConfigApp.service";
import { QueryUserDto } from "../domain/dtos/User.dto";
import { ResponseDto } from "../domain/dtos/Response.dto";
import { AppService } from "../application/App.service";
import { HttpFilterException } from "./HttpFilter.exception";

@Controller('/api/path/nestjs/template/users')
@UseFilters(HttpFilterException)
export class AppController{ 

  constructor(
    private readonly configApp: HttpConfigAppService, 
    private readonly appService: AppService){} 

  @Get()
  async get(@Query() bodyIn: QueryUserDto): Promise<ResponseDto>{
    
    try{
      return await this.appService.getAppService<QueryUserDto,ResponseDto>(bodyIn);
    }
    catch(err){
      if(err === 'timeout'){
        throw new RequestTimeoutException(err);
      }
      else{
        throw new InternalServerErrorException(err);
      }
    }
    
    
  }
}