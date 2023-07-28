import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpFilterDefaultException } from './userCRUD/infraestructure/adapter/HttpFilterDefault.exception';

async function bootstrap() {

  /**
   * 
   * @description
   * 
   */
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpFilterDefaultException());

  /**
   * 
   * @description
   * 
   */
  await app.listen(8080);
}
bootstrap();
