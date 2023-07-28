import { Module } from "@nestjs/common";
import { HttpService } from "./infraestructure/adapter/Http.service";
import { ConfigAppService } from "./application/ConfigApp.service";
import { LoggerWinstonService } from "./application/LoggerWinston.service";
import { I_HTTP_REPOSITORY } from "./infraestructure/port/Http.repository";
import { WinstonModule } from "nest-winston";
import * as winston from 'winston';
import { APP_INTERCEPTOR } from "@nestjs/core";
import { UpdateConfigAppService } from "./application/UpdateConfigApp.service";
import { FetchService } from "./infraestructure/adapter/Fetch.service";


@Module({
  imports: [
    WinstonModule.forRoot({
			transports: [ new winston.transports.Console({ format: winston.format.json() }) ]
		}),
  ],
  providers: [
    ConfigAppService,
    HttpService,
    FetchService,
    {
      useClass: HttpService,
      provide: I_HTTP_REPOSITORY,
    },
    {
      useClass: UpdateConfigAppService,
      provide: APP_INTERCEPTOR,
    },
    {
      useClass: LoggerWinstonService,
      provide: APP_INTERCEPTOR,
    }
  ],
  exports: [
    {
      useClass: HttpService,
      provide: I_HTTP_REPOSITORY,
    }
  ]
})
export class HttpModule {}