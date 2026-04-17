import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const config = new DocumentBuilder()
    .setTitle('Music API')
    .setDescription('API para gestionar canciones y géneros musicales')
    .setVersion('1.0')
    .addTag('Géneros')
    .addTag('Canciones')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Servidor corriendo en http://localhost:${process.env.PORT ?? 3000}`);
  console.log(`Swagger disponible en http://localhost:${process.env.PORT ?? 3000}/api/docs`);
}
bootstrap();
