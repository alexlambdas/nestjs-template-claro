import { Module } from "@nestjs/common";
import { HttpFetchService } from "./httpFetch.service";

@Module({
  providers:[HttpFetchService],
  exports:[HttpFetchService]
})
export class HttpFetchModule {}