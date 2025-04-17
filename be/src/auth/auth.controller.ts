import {
  Controller,
  Get,
  Post,
  Redirect,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/models/user/user.service';
import { url } from 'inspector';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // route này sẽ kích hoạt Google login
  }

    @Get('google/redirect')
    @UseGuards(AuthGuard('google'))
    @Redirect()
    async googleAuthRedirect(@Req() req: any) {
        const { googleId, email, firstName, lastName, picture } = req.user;

        let userByEmail = await this.userService.getOneByEmail(email)
        if (userByEmail) {
            let access_token = this.jwtService.sign({userId: userByEmail.userId, email: email})
            if(userByEmail.googleId){
                await this.userService.linkAccount(userByEmail, googleId, picture)
            }
            return {
                url: `${process.env.API_CLIENT}/auth-google?access_token=${access_token}`
            };
        } else {
            return {
                url: `${process.env.API_CLIENT}/auth-google?googleId=${googleId}&email=${email}&firstName=${firstName}&lastName=${lastName}&picture=${picture}`
            };
        }
    }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req: Request) {
    return this.authService.login(req.user);
  }
}
