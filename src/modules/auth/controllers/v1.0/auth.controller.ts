/* eslint-disable @typescript-eslint/no-empty-function */
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Request, Response } from 'express';
import * as _ from 'lodash';

import { SESSION_ID_NAME } from '@constants/index';
import { AuthenticatedGuard } from '@modules/auth/guards/authenticated.guard';
import { UserResponseDto } from '@modules/users/controllers/v1.0/dto/user.dto';
import { User } from '@modules/users/schemas/user.schema';
import { UsersService } from '@modules/users/users.service';

import { AuthService } from '../.././auth.service';
import { GoogleOAuthGuard } from '../../guards/google-oauth.guard';
import { LocalAuthGuard } from '../../guards/local-auth.guard';
import { GoogleRegisterRequestDto, LoginRequestDto } from './dto/login.dto';
import { ResetPasswordDto } from './dto/resetPassword.dto';
import { ResetPasswordRequestDto } from './dto/resetPasswordRequest.dto';

const version = '1.0';

@ApiTags(`Auth ${version}`)
@Controller({
  path: 'auth',
  version,
})
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  @Post('register')
  async register(@Body() body: LoginRequestDto) {
    const user = await this.usersService.findByEmail(body.email);
    if (user) {
      throw new ConflictException('Email already exists');
    }

    // create new local user
    if (body.email && body.password) {
      const createdUser = await this.usersService.create({
        email: body.email,
        password: body.password,
      });
      return _.omit(createdUser, ['password', '__v']);
    }

    // throw error if no email and password is provided
    throw new BadRequestException('Invalid request');
  }

  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Req() req: any) {
    const { access_token } = await this.authService.login(req.user as User);

    return { access_token };
  }

  @Post('google/register')
  async googleRegister(@Body() body: GoogleRegisterRequestDto) {
    const user = await this.usersService.findByEmail(body.email);
    if (user) {
      throw new ConflictException('Email already exists');
    }

    // create new google user
    if (body.email && body.googleAccessToken) {
      const isVerified = await this.authService.verifyGoogleAccessToken(
        body.email,
        body.googleAccessToken
      );
      if (isVerified) {
        const createdUser = await this.usersService.create({
          email: body.email,
        });
        return _.omit(createdUser, ['password', '__v']);
      } else {
        throw new BadRequestException('Google access token is invalid');
      }
    }

    // throw error if no email and access_token is provided
    throw new BadRequestException('Invalid request');
  }

  @UseGuards(GoogleOAuthGuard)
  @Get('google/login')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async googleLogin(@Req() req: Request) {}

  @UseGuards(GoogleOAuthGuard)
  @Get('google/callback')
  async googleCallback(@Req() req: any, @Res() res: Response) {
    if (!req.user.userKey) {
      res.cookie('wiserjournal_google_access_token', req.user.accessToken, {
        ...(process.env.COOKIE_DOMAIN
          ? { domain: process.env.COOKIE_DOMAIN }
          : {}),
        path: '/',
        httpOnly: true,
      });

      res.redirect(
        `${
          process.env.FE_BASE_URL
        }/login?code=UserNotFound&email=${encodeURIComponent(
          req.user.email as string
        )}`
      );

      return;
    }

    await this.authService.login(req.user as User);

    res.redirect(
      `${process.env.FE_BASE_URL}` +
        `${process.env.GOOGLE_OAUTH_REDIRECT_TO_FE_PATH}`
    );
  }

  @UseGuards(AuthenticatedGuard)
  @Post('signout')
  async signout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie(SESSION_ID_NAME, {
      ...(process.env.COOKIE_DOMAIN
        ? { domain: process.env.COOKIE_DOMAIN }
        : {}),
      path: '/',
    });
  }

  @UseGuards(AuthenticatedGuard)
  @ApiBearerAuth()
  @Get('profile')
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserResponseDto,
  })
  async getProfile(@Req() req: any) {
    const user = await this.usersService.findByEmail(req.user.email as string);
    return _.omit(user, ['_id', 'password', '__v']);
  }

  @HttpCode(HttpStatus.OK)
  @Post('reset-password/request')
  async resetPasswordRequest(
    @Body() resetPasswordRequestDto: ResetPasswordRequestDto
  ) {
    const user = await this.usersService.findByEmail(
      resetPasswordRequestDto.email
    );
    if (!user) {
      throw new BadRequestException('Email not found');
    }

    return this.authService.passwordResetRequest(resetPasswordRequestDto.email);
  }

  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    const user = await this.usersService.findByEmail(resetPasswordDto.email);
    if (!user) {
      throw new BadRequestException('Email not found');
    }

    return this.authService.resetPassword(resetPasswordDto);
  }
}
