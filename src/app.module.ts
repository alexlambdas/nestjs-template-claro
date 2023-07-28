import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from './share/Http/Http.module';
import { UserCRUDModule } from './userCRUD/UserCRUD.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    HttpModule,
    UserCRUDModule,
  ],
})
export class AppModule { }
