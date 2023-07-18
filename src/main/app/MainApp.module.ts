import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./infraestructure/App.controller";
import { HttpModule } from "../share/Http/Http.module";
import { MiddlewareService } from "./application/Middleware.service";
import { AppService } from "./application/App.service";
import { HttpConfigAppService } from "./application/HttpConfigApp.service";

@Module({
  imports: [ HttpModule ],
  providers: [ AppService, HttpConfigAppService ],
  controllers: [ AppController ],
})
export class MainAppModule implements NestModule{
  configure(consumer: MiddlewareConsumer){
    consumer
        .apply(MiddlewareService)
        .forRoutes(AppController)
  }
}