import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Redirect,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DataSource } from 'typeorm';
import { WorkspaceService } from '../workspace/workspace.service';
import { CreditCodeService } from '../credit-code/credit-code.service';
import { MemberRole } from '../workspace-member/entities/workspace-member.entity';
import { WorkspaceMemberService } from '../workspace-member/workspace-member.service';
import { EmailService } from 'src/services/mail/sendgrid';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/common/decorators/user.decorator';

@Controller('user')
export class UserController {
  constructor(
    private readonly dataSource: DataSource,
    private readonly userService: UserService,
    private readonly workspaceService: WorkspaceService,
    private readonly creditCodeService: CreditCodeService,
    private readonly workspaceMemberService: WorkspaceMemberService,
    private readonly emailService: EmailService,
  ) {}

  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const {
        plan,
        duration,
        totalProjects,
        totalBots,
        totalMembers,
        totalCredits,
      } = {
        plan: 'Free',
        duration: 60,
        totalProjects: 20,
        totalBots: 50,
        totalMembers: 5,
        totalCredits: 10000,
      };

      const [user, workspace] = await Promise.all([
        this.userService.create(queryRunner, createUserDto),
        this.workspaceService.create(queryRunner, {
          name: createUserDto.email.split('@')[0],
          plan,
          duration,
          totalProjects,
          totalBots,
          totalMembers,
        }),
      ]);

      await Promise.all([
        this.workspaceMemberService.addWorkspaceMember(queryRunner, {
          workspace,
          user,
          role: MemberRole.OWNER,
        }),
        this.creditCodeService.create(queryRunner, {
          totalCredits,
          duration,
          workspace,
        }),
      ]);

      await this.emailService.createNewUserMail(user);

      await queryRunner.commitTransaction();
      return {
        user: user,
        message:'Account register success!'
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  @Get('verify-email')
  @Redirect()
  async verifyEmail(@Query('token') token: string) {
    await this.userService.verifyEmail(token);
    return { url: `${process.env.API_CLIENT}/login` };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getOne(@User('userId') userId: string) {
    return this.userService.getOneById(userId);
  }
  
  @UseGuards(AuthGuard('jwt'))
  @Patch('change-password')
  changePassword(@Req() req:any , @Body() body:{password:string, newPassword:string}){
    const {password, newPassword} = body
    return this.userService.changePassword(req.user.userId, password, newPassword);
  }

  @Post('/forget-password')
  forgetPassword(@Body() body: { email: string }) {
    const { email } = body;
    return this.userService.forgetPassword(email)
  }

  @Post('/reset-password')
  resetPassword(@Body() body: { token: string, newPassword: string }) {
    const { token, newPassword } = body;
    return this.userService.resetPassword(token, newPassword);
  }

  @Get('/all')
  getAll() {
    return this.userService.findAll();
  }

  @Patch(':userId')
  update(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    this.userService.update(userId, updateUserDto);
    return { message: 'User updated successfully' };
  }

  @Delete(':userId')
  remove(@Param('userId') userId: string) {
    return this.userService.remove(userId);
  }

  @Get(':email')
  getUserByEmail(@Param('email') email: string) {
    return this.userService.getOneByEmail(email);
  }
}
