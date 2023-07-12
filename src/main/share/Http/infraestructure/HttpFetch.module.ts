import { Module } from "@nestjs/common";
import { CustomHttpService } from "./CustomHttp.service";

@Module({
  providers:[CustomHttpService],
  exports:[CustomHttpService]
})
export class HttpFetchModule {}