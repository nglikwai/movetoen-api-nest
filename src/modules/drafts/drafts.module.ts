import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DraftsController } from './drafts.controller';
import { DraftsService } from './drafts.service';
import { Draft, DraftSchema } from './schemas/draft.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Draft.name, schema: DraftSchema }])],
  controllers: [DraftsController],
  providers: [DraftsService],
  exports: [DraftsService],
})
export class DraftsModule {}
