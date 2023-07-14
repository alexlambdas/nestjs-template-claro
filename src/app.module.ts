import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from './main/share/Http/Http.module';
import { MainAppModule } from './main/app/MainApp.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    HttpModule,
    MainAppModule,
  ],
})
export class AppModule { }
