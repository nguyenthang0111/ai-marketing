import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { EmailService } from 'src/services/mail/sendgrid';
import { WorkspaceModule } from '../workspace/workspace.module';
import { CreditCodeModule } from '../credit-code/credit-code.module';
import { WorkspaceMemberModule } from '../workspace-member/workspace-member.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthConfigModule } from 'src/config/auth/config.module';
import { AuthConfigService } from 'src/config/auth/config.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    forwardRef(() => WorkspaceModule),
    CreditCodeModule,
    WorkspaceMemberModule,
    JwtModule.registerAsync(
      {
        imports: [AuthConfigModule],
        inject: [AuthConfigService],
        useFactory: async (authConfigService: AuthConfigService) => ({
          secret: authConfigService.jwt,
          signOptions: { expiresIn: '1d' },
        }),
      }
    )
  ],
  controllers: [UserController],
  providers: [UserService, EmailService],
  exports: [TypeOrmModule, UserService],
})
export class UserModule { }
