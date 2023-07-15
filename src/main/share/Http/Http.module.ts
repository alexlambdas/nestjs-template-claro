import { Global, Module } from "@nestjs/common";
import { HttpService } from "./infraestructure/Http.service";
import { ConfigAppHttpService } from "./application/ConfigAppHttp.service";
import { WinstonLoggerService } from "./application/WinstonLogger.service";
import { I_CUSTOM_HTTP_REPOSITORY } from "./application/CustomHttp.repository";
import { WinstonModule } from "nest-winston";
import * as winston from 'winston';
import { APP_INTERCEPTOR } from "@nestjs/core";


@Module({
  imports: [
    WinstonModule.forRoot({
			transports: [ new winston.transports.Console({ format: winston.format.json() }) ]
		}),
  ],
  providers: [
    ConfigAppHttpService,
    HttpService,
    {
      useClass: HttpService,
      provide: I_CUSTOM_HTTP_REPOSITORY,
    },
    {
      useClass: WinstonLoggerService,
      provide: APP_INTERCEPTOR,
    }
  ],
  exports: [
    {
      useClass: HttpService,
      provide: I_CUSTOM_HTTP_REPOSITORY,
    }
  ]
})
export class HttpModule {}