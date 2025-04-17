import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthConfigService {
    constructor(private configService: ConfigService){}

    get jwt():string{
        return this.configService.get<string>('auth.secret', '')
    }
    get clientId():string{
        return this.configService.get<string>('auth.clientId', '')
    }
    get clientSecret():string{
        return this.configService.get<string>('auth.clientSecret', '')
    }
}