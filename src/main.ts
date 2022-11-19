import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger:['error', 'warn', 'log'],
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT_APP || 3000);
  console.log(` \n --- Running port: ${process.env.PORT_APP } --- \n`)
}
bootstrap();
