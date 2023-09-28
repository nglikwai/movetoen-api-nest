/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as _ from 'lodash';
import fetch from 'node-fetch';

import { passwordResetEmail } from '@modules/emails/email.template';
import { EmailsService } from '@modules/emails/emails.service';
import { User } from '@modules/users/schemas/user.schema';
import { UsersService } from '@modules/users/users.service';
import { CryptoUtility } from '@utils/crypto.utils';

import { ResetPasswordDto } from './controllers/v1.0/dto/resetPassword.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private emailsService: EmailsService
  ) {}

  public async validateUser(email: string, password: string) {
    const user = await this.usersService.findOne({ email });
    const { hash } = CryptoUtility.encryptBySalt(
      password,
      user?.password?.salt
    );
    if (!user || hash !== user?.password?.hash) {
      return null;
    }
    return user;
  }

  public async validateGoogleUser(googleUser: {
    email: string;
    firstName: string;
    lastName: string;
    displayName: string;
    avatar: string;
    accessToken: string;
    refreshToken: string;
  }) {
    const user = await this.usersService.findOne({ email: googleUser.email });

    // if user not exist in DB, create new user
    // if (!user) {
    //   const newUser = await this.usersService.create({
    //     email: googleUser.email,
    //   });
    //   return newUser;
    // }

    if (!user) {
      return null;
    }

    return user;
  }

  async findById(id: string) {
    const user = await this.usersService.findById(id);
    return user;
  }

  async login(user: User) {
    const payload = {
      sub: user._id,
      ..._.pick(user, ['userKey', 'email', 'status']),
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async verifyGoogleAccessToken(email: string, accessToken: string) {
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${accessToken}`
    );
    const googleTokenInfo: any = await response.json();
    return googleTokenInfo?.email === email;
  }

  passwordResetRequest(email: string) {
    const resetCode = Math.floor(Math.random() * 900000) + 100000;
    const emailContent = passwordResetEmail(email, resetCode);
    return this.emailsService.createEmail(emailContent);
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const user = await this.usersService.findByEmail(resetPasswordDto.email);
    if (!user) {
      throw new Error('Email not found');
    }

    await this.usersService.updatePassword(
      user._id,
      resetPasswordDto.newPassword
    );
  }
}
