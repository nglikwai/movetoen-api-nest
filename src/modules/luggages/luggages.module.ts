import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { LuggagesController } from './luggages.controller';
import { LuggagesService } from './luggages.service';
import { Luggage, LuggageSchema } from './schemas/luggage.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Luggage.name, schema: LuggageSchema }])],
  controllers: [LuggagesController],
  providers: [LuggagesService],
})
export class LuggagesModule {}
