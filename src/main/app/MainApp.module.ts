import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./infraestructure/App.controller";
import { HttpModule } from "../share/Http/Http.module";
import { Middleware } from "./application/Middleware.service";
import { AppService } from "./application/App.service";
import { ConfigApp } from "./application/ConfigApp.service";

@Module({
  imports: [ HttpModule ],
  providers: [ AppService, ConfigApp ],
  controllers: [ AppController ],
})
export class MainAppModule implements NestModule{
  configure(consumer: MiddlewareConsumer){
    consumer
        .apply(Middleware)
        .forRoutes(AppController)
  }
}