import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersModule } from '@modules/users/users.module';

import { JournalsController } from './controllers/v1.0/journals.controller';
import { JournalsService } from './journals.service';
import { Journal, JournalSchema } from './schemas/journals.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Journal.name, schema: JournalSchema }]),
    UsersModule,
  ],
  controllers: [JournalsController],
  providers: [JournalsService],
})
export class JournalsModule {}
