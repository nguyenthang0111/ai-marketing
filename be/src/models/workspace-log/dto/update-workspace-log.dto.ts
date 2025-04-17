import { PartialType } from '@nestjs/mapped-types';
import { CreateWorkspaceLogDto } from './create-workspace-log.dto';

export class UpdateWorkspaceLogDto extends PartialType(CreateWorkspaceLogDto) {}
