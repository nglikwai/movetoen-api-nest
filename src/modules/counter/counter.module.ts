import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CounterSchema } from './schemas/counter.schema';
import { CounterHandlerService } from './services/counter.handler.service';
import { MongoService } from './services/mongo.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Counters', schema: CounterSchema }]),
  ],
  providers: [CounterHandlerService, MongoService],
  exports: [CounterHandlerService],
})
export class CounterModule {}
