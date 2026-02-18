import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // Habilitar la valid ación global para DTO
  app.useGlobalPipes(new ValidationPipe());
  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle(`Erika's HomeMade API`)
    .setDescription('Documentación de la API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Aún no se sabe si por buenas practicas se hace acá o en lib/
  // admin.initializeApp({
  //   credential: admin.credential.cert(process.env.FIREBASE_SERVICE_ACCOUNT_KEY!),
  // });

  // Aplicar el filtro global de excepciones (para estructurar errores HTTP)
  app.useGlobalFilters(new HttpExceptionFilter());
  // Aplicar el interceptor global (para manejar errores inesperados)
  // app.useGlobalInterceptors(new GlobalErrorInterceptor());

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);

  const url = await app.getUrl();
  console.log(`✨ Erika's API is up and cooking at: ${url} ✨`);
  console.log(`📚 Swagger docs: ${url}/api`);
}

(async () => await bootstrap())();
