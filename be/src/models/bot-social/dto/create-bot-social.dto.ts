import {
  IsBoolean,
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateBotSocialDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  prompt: string;

  @IsOptional()
  @IsBoolean()
  favorite: boolean;
}
