import sgMail from '@sendgrid/mail';
import { Injectable, Logger } from '@nestjs/common';
import { UserEntity } from 'src/models/user/entities/user.entity';
import { text } from 'stream/consumers';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  constructor() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
  }

  async createNewUserMail(user: UserEntity): Promise<void> {
    const url = `http://localhost:8081/api/user/verify-email?token=${user.verificationToken}`;
    const to = user.email;
    let subject;
    let html;

    if (!user.googleId) {
      subject = '[AI Marketing] Confirm Your Account';
      html = `
            <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; color: #333;">
                <h2 style="color: #4CAF50;">Welcome to AI Marketing!</h2>
                <p>Please verify your email address by clicking the button below:</p>
                <a href="${url}" style="display: inline-block; margin-top: 20px; padding: 10px 20px; color: #fff; background-color: #4CAF50; text-decoration: none; border-radius: 5px; font-weight: bold;">
                    Confirm Email
                </a>
                <p>If you didn't register, please ignore this email.</p>
            </div>
        `;
    } else {
      subject = '[AI Marketing] Registration Successful';
      html = `
            <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; color: #333;">
                <h2 style="color: #4CAF50;">Welcome to AI Marketing!</h2>
                <p>Thank you for registering with us using Google. You can now log in and start exploring our platform.</p>
                <p>If you have any questions, feel free to reach out to our support team.</p>
            </div>
        `;
    }

    const msg = {
      from: process.env.EMAIL_ADDRESS!,
      to,
      subject,
      html,
    };
    try {
      await sgMail.send(msg);
      this.logger.log(`Email đã được gửi đến ${to}`);
    } catch (error) {
      this.logger.error(`Không thể gửi email đến ${to}`, error);
      throw new Error('Failed to send email');
    }
  }

  async forgetPassword(email: string, token: string): Promise<void> {
    const to = email;
    let subject = '[AI Marketing] Password Reset Instructions';
    let html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; padding: 20px;">
        <h2 style="color:rgb(201, 142, 61); text-align: center;">[AI Marketing] Password Reset Instructions</h2>
        <p>Dear User,</p>
        <p>You requested to reset your password. Please click the button below to proceed:</p>
        <div style="text-align: center; margin: 20px 0;">
          <a href="${process.env.API_CLIENT}/api/user/reset-password?token=${token}" 
            style="display: inline-block; background-color:rgb(219, 155, 44); color: white; text-decoration: none; padding: 10px 20px; font-size: 16px; border-radius: 5px;">
            Reset Password
          </a>
        </div>
        <p>If you did not request a password reset, please ignore this email.</p>
        <p>Thank you,<br>The AI Marketing Team</p>
      </div>
      `
    ;


    const msg = {
      from: process.env.EMAIL_ADDRESS!,
      to,
      subject,
      html
    }
    try {
      await sgMail.send(msg);
      this.logger.log(`Email đã được gửi đến ${to}`);
    } catch (error) {
      this.logger.error(`Không thể gửi email đến ${to}`, error);
      throw new Error('Failed to send email');
    }
  }
}
