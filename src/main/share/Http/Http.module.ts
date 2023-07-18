import { Global, Module } from "@nestjs/common";
import { HttpService } from "./infraestructure/Http.service";
import { HttpConfigAppService } from "./application/HttpConfigApp.service";
import { WinstonLoggerService } from "./application/WinstonLogger.service";
import { I_HTTP_REPOSITORY } from "./application/Http.repository";
import { WinstonModule } from "nest-winston";
import * as winston from 'winston';
import { APP_INTERCEPTOR } from "@nestjs/core";
import { UpdateHttpConfigAppService } from "./application/UpdateHttpConfigApp.service";


@Module({
  imports: [
    WinstonModule.forRoot({
			transports: [ new winston.transports.Console({ format: winston.format.json() }) ]
		}),
  ],
  providers: [
    HttpConfigAppService,
    HttpService,
    {
      useClass: HttpService,
      provide: I_HTTP_REPOSITORY,
    },
    {
      useClass: UpdateHttpConfigAppService,
      provide: APP_INTERCEPTOR,
    },
    {
      useClass: WinstonLoggerService,
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