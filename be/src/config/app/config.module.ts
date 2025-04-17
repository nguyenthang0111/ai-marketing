import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfigService } from './config.service';
import appConfiguration from './configuration';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfiguration],
      validationSchema: Joi.object({
        APP_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        APP_NAME: Joi.string().default('NestJS API'),
        APP_HOST: Joi.string().default('http://localhost'),
        APP_PORT: Joi.number().port().default(3000),
      }),
      isGlobal: true,
      envFilePath: ['.env', '.env.development'],
      cache: true,
    }),
  ],
  providers: [ConfigService, AppConfigService],
  exports: [ConfigService, AppConfigService],
})
export class AppConfigModule {}
