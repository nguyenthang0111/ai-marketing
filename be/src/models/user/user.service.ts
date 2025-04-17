import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailProvider, UserEntity } from './entities/user.entity';
import { Repository, DataSource } from 'typeorm';
import { AccountStatus } from './entities/user.entity';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/services/mail/sendgrid';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly dataSource: DataSource,
    private jwtService: JwtService,
    private emailService: EmailService,
  ) {}

  async create(queryRunner: any, createUserDto: CreateUserDto) {
    if (createUserDto.googleId) {
      createUserDto.emailProvider = EmailProvider.Google
    }

    await this.checkIfEmailExists(queryRunner, createUserDto.email);

    const verificationToken = crypto.randomBytes(20).toString('hex');
    const user = queryRunner.manager.create(UserEntity, {
      ...createUserDto,
      verificationToken,
    });
    await queryRunner.manager.save(user);

    return user;
  }

  private async checkIfEmailExists(queryRunner: any, email: string) {
    const existingUser = await queryRunner.manager.findOne(UserEntity, {
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }
  }

  async verifyEmail(token: string) {
    const user = await this.userRepository.findOne({
      where: { verificationToken: token },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }
    await this.userRepository.update(user.userId, {
      accountStatus: AccountStatus.Active,
      verificationToken: null,
    });
  }

  async linkAccount(
    existingUser: UserEntity,
    googleId: string,
    picture: string,
  ) {
    if (!existingUser.googleId || !existingUser.avatarUrl) {
      await this.userRepository.update(existingUser.userId, {
        googleId,
        avatarUrl: picture,
      });
    }
  }

  async updateUser(user: UserEntity) {
    await this.userRepository.update(user.userId, {
      accountStatus: AccountStatus.Active,
    });
  }

  getOneByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  findAll() {
    return this.userRepository.find();
  }

  getOneById(userId: string): Promise<UserEntity> {
    return this.userRepository.findOneByOrFail({ userId });
  }

  async update(userId: string, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(
      userId,
      updateUserDto
    )
  }

  async changePassword(userId: string, password: string, newPassword: string) {
    let user = await this.userRepository.findOneByOrFail({ userId })
    const isMatchPassword = await bcrypt.compare(password, user.password!)
    if (isMatchPassword) {
      let hashPassword = bcrypt.hashSync(newPassword, 10)
      await this.userRepository.update(userId, { password: hashPassword })
      return {
        message: 'Password changed successfully',
      }
    } else {
      throw new UnauthorizedException('Invalid password')
    }
  }

  async forgetPassword(email: string) {
    const user = await this.getOneByEmail(email)
    if (!user) {
      throw new BadRequestException('User not found')
    } else {
      const token = this.jwtService.sign({ userId: user.userId });
      await this.emailService.forgetPassword(email, token)
      return {
        token: token,
        message: `Email has been sent to ${email}. Follow the instructions to reset your password.`
      }
    }
  }

  async resetPassword(token:string, password: string){
    const decoded = this.jwtService.verify(token)
    if(!decoded){
      throw new UnauthorizedException('Invalid token')
    } else {
      const hashPassword = bcrypt.hashSync(password, 10);
      await this.userRepository.update(decoded.userId, {password: hashPassword})
      return {
        message: 'Password reset successfully',
      }
    }
  }

  remove(userId: string) {
    return this.userRepository.delete(userId);
  }
}
