/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable no-shadow */
import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

import { UserEntity } from '@modules/users/controllers/v1.0/dto/user.dto';

import { AuthService } from '../auth.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private authService: AuthService) {
    super();
  }

  serializeUser(
    user: UserEntity,
    done: (err: Error, user: UserEntity) => void
  ): any {
    done(null, user);
  }

  async deserializeUser(
    payload: any,
    done: (err: Error, payload: any) => void
  ): Promise<any> {
    const user = await this.authService.findById(payload._id);
    return done(null, user || null);
  }
}
