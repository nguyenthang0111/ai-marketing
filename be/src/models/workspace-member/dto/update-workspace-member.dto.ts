import { PartialType } from '@nestjs/mapped-types';
import { AddWorkspaceMemberDto } from './add-workspace-member.dto';

export class UpdateWorkspaceMemberDto extends PartialType(
  AddWorkspaceMemberDto,
) {}
