import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { GlobalErrorInterceptor } from './common/interceptors/global-error.interceptor';
import * as admin from 'firebase-admin';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar la validación global para DTOs
  app.useGlobalPipes(new ValidationPipe());

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle(`Erika's HomeMade API`)
    .setDescription('Documentación de la API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalInterceptors(new GlobalErrorInterceptor());

  // admin.initializeApp({
  //   credential: admin.credential.cert(process.env.FIREBASE_SERVICE_ACCOUNT_KEY!),
  // });
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
