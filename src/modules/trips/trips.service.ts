import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { Trip, TripDocument } from './schemas/trip.schema';

@Injectable()
export class TripsService {
  constructor(@InjectModel(Trip.name) private tripModel: Model<TripDocument>) {}

  create(createTripDto: CreateTripDto) {
    const createdTrip = new this.tripModel(createTripDto);
    return createdTrip.save();
  }

  findAll() {
    return this.tripModel.find().exec();
  }

  findOne(id: number) {
    return this.tripModel.findById(id).exec();
  }

  update(id: number, updateTripDto: UpdateTripDto) {
    return this.tripModel.findByIdAndUpdate(id, updateTripDto).exec();
  }

  remove(id: number) {
    return this.tripModel.findByIdAndDelete(id).exec();
  }
}
