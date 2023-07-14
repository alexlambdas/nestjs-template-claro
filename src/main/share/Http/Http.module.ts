import { Global, Module } from "@nestjs/common";
import { FetchService } from "./infraestructure/Fetch.service";
import { CustomHttpService } from "./infraestructure/CustomHttp.service";
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
    FetchService,
    ConfigAppHttpService,
    CustomHttpService,
    {
      useClass: CustomHttpService,
      provide: I_CUSTOM_HTTP_REPOSITORY,
    },
    {
      useClass: WinstonLoggerService,
      provide: APP_INTERCEPTOR,
    }
  ],
  exports: [
    {
      useClass: CustomHttpService,
      provide: I_CUSTOM_HTTP_REPOSITORY,
    }
  ]
})
export class HttpModule {}