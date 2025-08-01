import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { whitelist } from 'validator';

async function bootstrap() {
 console.log('🚀 MONGODB_URL:', process.env.MONGODB_URL);
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true , transform: true ,  forbidNonWhitelisted: true,}));
  app.enableCors();//allow any origin from frontend
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
