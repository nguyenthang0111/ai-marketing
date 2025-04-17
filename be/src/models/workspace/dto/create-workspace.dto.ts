import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateWorkspaceDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsNotEmpty()
  @IsString()
  plan: string;

  @IsNotEmpty()
  @IsNumber()
  duration: number;

  @IsDefined()
  @IsNumber()
  totalProjects: number;

  @IsDefined()
  @IsNumber()
  totalBots: number;

  @IsDefined()
  @IsNumber()
  totalMembers: number;
}
