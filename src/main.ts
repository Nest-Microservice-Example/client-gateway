import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger(AppModule.name);

  const app = await NestFactory.create(AppModule);

  await app.listen(AppModule.PORT);

  logger.log(`Gateway running on port ${AppModule.PORT}`);
}

bootstrap();
