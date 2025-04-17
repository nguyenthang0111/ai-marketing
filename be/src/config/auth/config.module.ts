import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthConfigService } from './config.service';
import authConfiguration from './configuration';

@Module({
  imports: [ConfigModule.forFeature(authConfiguration)],
  providers: [ConfigService, AuthConfigService],
  exports: [ConfigService, AuthConfigService],
})
export class AuthConfigModule {}