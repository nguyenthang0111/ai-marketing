import {
  IsBoolean,
  IsDefined,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';
import { AccountStatus, EmailProvider } from '../entities/user.entity';

export class CreateUserDto {
  @IsDefined()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  avatarUrl: string;

  @IsOptional()
  @IsString()
  googleId: string;

  @IsOptional()
  @IsEnum(EmailProvider)
  emailProvider: EmailProvider = EmailProvider.Email;

  @IsOptional()
  @IsEnum(AccountStatus)
  accountStatus: AccountStatus = AccountStatus.NotVerify;

  @IsOptional()
  @IsString()
  verificationToken: string;
}
