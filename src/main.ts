import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {

  /**
   * 
   * @description
   * 
   */
  const app = await NestFactory.create(AppModule);

  /**
   * 
   * @description
   * 
   */
  await app.listen(8080);
}
bootstrap();
