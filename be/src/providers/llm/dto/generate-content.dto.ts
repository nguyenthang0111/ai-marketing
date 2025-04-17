import {
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsDefined,
  IsBoolean,
} from 'class-validator';
export class ContentFormat {
  @IsOptional()
  @IsString()
  customContent: string;

  @IsDefined()
  @IsString()
  model: string;

  @IsDefined()
  @IsString()
  creativityLevel: string;

  @IsDefined()
  @IsString()
  length: string;

  @IsDefined()
  @IsString()
  tone: string;

  @IsDefined()
  @IsString()
  language: string;

  @IsDefined()
  @IsBoolean()
  useEmoji: boolean;

  @IsDefined()
  @IsBoolean()
  useMarkdown: boolean;
}

export class GenerateContentDto {
  @IsNotEmpty()
  @IsString()
  userPrompt: string;

  @IsOptional()
  @IsObject()
  contentFormat: ContentFormat;

  @IsOptional()
  @IsString()
  botSocialId: string;

  @IsOptional()
  @IsString()
  botWebId: string;
}
