import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Logs } from './data/entities/Logs';
import { GlobalErrorInterceptor } from './common/interceptors/global-error.interceptor';
import {ConfigModule as Config} from './modules/config/config.module';
import { LogService } from './lib/services/log.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Hace que las variables de entorno estén disponibles en toda la aplicación
    }),
    TypeOrmModule.forRoot({
      name        : 'sqliteConnection',
      type        : 'sqlite',
      database    : 'logs.sqlite',
      entities    : [Logs],
      synchronize : true,
    }),
    TypeOrmModule.forFeature([Logs], 'sqliteConnection'),
    Config,
  ],
  controllers : [AppController],
  providers   : [
    AppService,
    LogService,
    { provide : APP_INTERCEPTOR, useClass: GlobalErrorInterceptor },
  ],
})
export class AppModule {}
