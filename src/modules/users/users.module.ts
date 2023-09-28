import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CounterModule } from '@modules/counter/counter.module';

import { UsersController } from './controllers/v1.0/users.controller';
import { User, UserSchema } from './schemas/user.schema';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    CounterModule,
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
