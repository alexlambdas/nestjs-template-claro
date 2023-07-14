import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppFetchController } from "./infraestructure/AppFetch.controller";
import { HttpModule } from "../share/Http/Http.module";
import { MiddlewareService } from "./application/Middleware.service";

@Module({
  imports: [ HttpModule ],
  controllers: [ AppFetchController ],
})
export class MainAppModule implements NestModule{
  configure(consumer: MiddlewareConsumer){
    consumer
        .apply(MiddlewareService)
        .forRoutes(AppFetchController)
  }
}