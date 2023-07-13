import { Module } from "@nestjs/common";
import { CustomHttpService } from "./CustomHttp.service";
import { FetchService } from "./Fetch.service";

@Module({
  providers:[
    FetchService,
    CustomHttpService
  ],
  exports:[
    FetchService,
    CustomHttpService,
  ]
})
export class HttpFetchModule {}