import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpFilterDefault } from './main/app/infraestructure/HttpFilterDefault.exception';

async function bootstrap() {

  /**
   * 
   * @description
   * 
   */
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpFilterDefault());

  /**
   * 
   * @description
   * 
   */
  await app.listen(8080);
}
bootstrap();
