import { Module } from '@nestjs/common';

import { EmailsModule } from '@modules/emails/emails.module';
import { UsersModule } from '@modules/users/users.module';

import { AuthService } from './auth.service';
import { AuthController } from './controllers/v1.0/auth.controller';
import { GoogleStrategy } from './strategies/google.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { SessionSerializer } from './utils/Serializer';

@Module({
  imports: [UsersModule, EmailsModule],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    GoogleStrategy,
    SessionSerializer,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
