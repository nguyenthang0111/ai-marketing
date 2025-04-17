import { IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { UserEntity } from 'src/models/user/entities/user.entity';
import { WorkspaceEntity } from 'src/models/workspace/entities/workspace.entity';
import { MemberRole } from '../entities/workspace-member.entity';
export class AddWorkspaceMemberDto {
  @IsDefined()
  workspace: WorkspaceEntity;

  @IsDefined()
  user: UserEntity;

  @IsNotEmpty()
  role: MemberRole;
}
