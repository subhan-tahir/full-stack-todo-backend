import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  console.log('🚀 MONGODB_URL', process.env.MONGODB_URL);
console.log('PORT...s',process.env.PORT);
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ 
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
  }));

  app.enableCors(); // allow any origin

  const port = process.env.PORT || 4000;

  // ✅ this is crucial for Railway to access your app
  await app.listen(port, '0.0.0.0');
}
bootstrap();
