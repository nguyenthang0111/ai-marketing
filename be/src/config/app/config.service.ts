import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}
  get env(): string {
    return this.configService.get<string>('app.env', 'development');
  }
  get name(): string {
    return this.configService.get<string>('app.name', 'NestJS API');
  }
  get host(): string {
    return this.configService.get<string>('app.host', 'http://localhost');
  }
  get port(): number {
    return this.configService.get<number>('app.port', 3000);
  }
}
