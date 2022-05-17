import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const swaggerConfig = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Microservices-uber-eats Auth service')
    .setDescription('REST API Documentation')
    .setVersion('1.0.0')
    .addTag('Microservice')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/api/docs', app, document);

  const PORT = process.env.PORT || 4001;
  await app.listen(PORT, () =>
    console.log(`Auth service is running on port ${PORT}`),
  );
}
bootstrap();
