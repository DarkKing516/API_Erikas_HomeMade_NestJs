import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LogsEntity } from './data/entities/Logs.entity';
import { GlobalErrorInterceptor } from './common/interceptors/global-error.interceptor';
import { ConfigModule as Config } from './modules/config/config.module';
import { LogService } from './lib/services/log.service';
import { ProductsModule } from './modules/product/product.module';
import { DateModule } from './modules/date/date.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Hace que las variables de entorno estén disponibles en toda la aplicación
    }),
    TypeOrmModule.forRoot({
      name        : 'sqliteConnection',
      type        : 'sqlite',
      database    : 'logs.sqlite',
      entities    : [LogsEntity],
      synchronize : true,
    }),
    TypeOrmModule.forFeature([LogsEntity], 'sqliteConnection'),
    Config,
    ProductsModule,
    DateModule,
  ],
  controllers : [AppController],
  providers   : [
    AppService,
    LogService,
    { provide: APP_INTERCEPTOR, useClass: GlobalErrorInterceptor },
  ],
})
export class AppModule {}
