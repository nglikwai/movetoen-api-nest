import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

import { Observable } from 'rxjs';

@Injectable()
export class AuthenticatedGuard
  extends AuthGuard(['local', 'jwt', 'google'])
  implements CanActivate
{
  constructor(private reflector: Reflector) {
    super({
      passReqToCallback: true,
    });
  }

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    // Check if user is authenticated with express-session
    if (request.isAuthenticated()) {
      return true;
    }

    // Check if JWT token is valid
    const authHeader = request.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return super.canActivate(context);
    }

    return false;
  }
}
