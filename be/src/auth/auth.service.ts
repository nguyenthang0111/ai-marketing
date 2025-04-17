import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/models/user/user.service";
import * as bcrypt from 'bcrypt'
import { AccountStatus } from "src/models/user/entities/user.entity";


@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.userService.getOneByEmail(email);
        if (!user) {
            throw new BadRequestException('This account does not exist')
        }
        if (user) {
            const isMatch = await bcrypt.compare(pass, user.password!)
            if (!isMatch) {
                throw new BadRequestException('Password is incorrect')
            }
            if(user.accountStatus !== AccountStatus.Active){
                if(user.googleId){
                    await this.userService.updateUser(user)
                } else{
                    throw new UnauthorizedException('Account is not verify email')
                }
            }
        }
        const { password, ...result } = user;
        return result;
    }

    async login(user: any) {
        const payload = { email: user.email, userId: user.userId }
        return {
            data: user,
            accessToken: this.jwtService.sign(payload),
        }
    }
}
