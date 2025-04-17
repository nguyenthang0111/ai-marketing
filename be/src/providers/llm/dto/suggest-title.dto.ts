import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SuggestTitleDto {
  @IsNotEmpty()
  @IsString()
  articleContent: string;

  @IsOptional()
  @IsString()
  botSocialId: string;

  @IsOptional()
  @IsString()
  botWebId: string;
}
