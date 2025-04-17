import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WorkspaceLogService } from './workspace-log.service';
import { CreateWorkspaceLogDto } from './dto/create-workspace-log.dto';
import { UpdateWorkspaceLogDto } from './dto/update-workspace-log.dto';

@Controller('workspace-log')
export class WorkspaceLogController {
  constructor(private readonly workspaceLogService: WorkspaceLogService) {}
}
