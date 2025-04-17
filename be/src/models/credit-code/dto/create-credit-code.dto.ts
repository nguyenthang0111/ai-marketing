import { IsDefined, IsInt } from 'class-validator';
import { WorkspaceEntity } from 'src/models/workspace/entities/workspace.entity';

export class CreateCreditCodeDto {
  @IsInt()
  @IsDefined()
  totalCredits: number;

  @IsInt()
  @IsDefined()
  duration: number;

  @IsDefined()
  workspace: WorkspaceEntity;
}
