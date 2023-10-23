import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DraftsModule } from '@modules/drafts/drafts.module';
import { NotesModule } from '@modules/notes/notes.module';
import { PlansModule } from '@modules/plans/plans.module';
import { UsersModule } from '@modules/users/users.module';

import { Trip, TripSchema } from './schemas/trip.schema';
import { TripsController } from './trips.controller';
import { TripsService } from './trips.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Trip.name, schema: TripSchema }]),
    UsersModule,
    PlansModule,
    NotesModule,
    DraftsModule,
  ],
  controllers: [TripsController],
  providers: [TripsService],
  exports: [TripsService],
})
export class TripsModule {}
