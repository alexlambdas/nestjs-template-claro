import { Module } from "@nestjs/common";
import { HttpService } from "./infraestructure/Http.service";
import { ConfigApp } from "./application/ConfigApp.service";
import { LoggerWinston } from "./application/LoggerWinston.service";
import { I_HTTP_REPOSITORY } from "./application/Http.repository";
import { WinstonModule } from "nest-winston";
import * as winston from 'winston';
import { APP_INTERCEPTOR } from "@nestjs/core";
import { UpdateConfigApp } from "./application/UpdateConfigApp.service";


@Module({
  imports: [
    WinstonModule.forRoot({
			transports: [ new winston.transports.Console({ format: winston.format.json() }) ]
		}),
  ],
  providers: [
    ConfigApp,
    HttpService,
    {
      useClass: HttpService,
      provide: I_HTTP_REPOSITORY,
    },
    {
      useClass: UpdateConfigApp,
      provide: APP_INTERCEPTOR,
    },
    {
      useClass: LoggerWinston,
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