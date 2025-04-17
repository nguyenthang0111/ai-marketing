import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exception.filter';
import { AppConfigService } from './config/app/config.service';
import { ValidationPipe } from '@nestjs/common';
import 'reflect-metadata';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'debug', 'fatal', 'log'],
    // logger: ['error', 'warn', 'debug', 'fatal', 'log', 'verbose'],
    cors: true
  });
  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.setGlobalPrefix('api');
  const appConfig: AppConfigService = app.get(AppConfigService);
  await app.listen(appConfig.port);
  console.log(`Application is running on: ${appConfig.host}:${appConfig.port}`);
}
bootstrap();