import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/models/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategy/local.strategy';
import { GoogleStrategy } from './strategy/google.strategy';
import { AuthConfigService } from 'src/config/auth/config.service';
import { AuthConfigModule } from 'src/config/auth/config.module';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
    imports:[PassportModule, UserModule, JwtModule.registerAsync({
        imports: [AuthConfigModule],
        inject: [AuthConfigService],
        useFactory: async (authConfigService: AuthConfigService) => ({
          secret: authConfigService.jwt,
          signOptions: { expiresIn: '1d' },
        }),
      }),],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, GoogleStrategy, AuthConfigService, JwtStrategy],
    exports:[AuthService, AuthConfigService]
})
export class AuthModule {}
