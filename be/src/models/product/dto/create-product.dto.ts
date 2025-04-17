import {
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  benefit: string;

  @IsOptional()
  @IsString()
  promotion: string;

  @IsOptional()
  @IsString()
  customerPersona: string;

  @IsOptional()
  @IsString()
  customerProblem: string;

  @IsOptional()
  @IsString()
  solution: string;
}
