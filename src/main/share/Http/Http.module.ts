import { Module } from "@nestjs/common";
import { FetchService } from "./infraestructure/Fetch.service";
import { CustomHttpService } from "./infraestructure/CustomHttp.service";
import { ConfigAppHttpService } from "./application/ConfigAppHttp.service";

@Module({
  providers: [
    FetchService,
    CustomHttpService,
    ConfigAppHttpService,
  ]
})
export class HttpModule {}