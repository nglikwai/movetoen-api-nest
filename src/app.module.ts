import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';

import * as Joi from 'joi';

import { AuthModule } from '@modules/auth/auth.module';
import { CounterModule } from '@modules/counter/counter.module';
import { UsersModule } from '@modules/users/users.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheModule } from './modules/cache/cache.module';
import { DraftsModule } from './modules/drafts/drafts.module';
import { EmailsModule } from './modules/emails/emails.module';
import { LuggagesModule } from './modules/luggages/luggages.module';
import { NotesModule } from './modules/notes/notes.module';
import { PlannersModule } from './modules/planners/planners.module';
import { PlansModule } from './modules/plans/plans.module';
import { TodosModule } from './modules/todos/todos.module';
import { TripsModule } from './modules/trips/trips.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: process.env.APP_ENV === 'production',
      isGlobal: true,
      cache: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('development', 'staging', 'production', 'test').required(),
        APP_ENV: Joi.string().valid('development', 'staging', 'production', 'test').required(),
        PORT: Joi.number().integer().required(),
        MONGODB_URI: Joi.string().uri().required(),
      }),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        dbName: configService.get<string>('APP_ENV') === 'test' ? 'test' : 'triplaner-api',
      }),
      inject: [ConfigService],
    }),
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_SECRET_KEY'),
        signOptions: {
          expiresIn: config.get('JWT_SECRET_EXPIRES_IN') || '30 days',
        },
      }),
    }),
    PassportModule.register({ session: true }),
    CounterModule,
    UsersModule,
    AuthModule,
    CacheModule,
    EmailsModule,
    TripsModule,
    NotesModule,
    LuggagesModule,
    TodosModule,
    PlansModule,
    DraftsModule,
    PlannersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
