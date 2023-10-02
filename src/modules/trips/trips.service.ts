/* eslint-disable no-underscore-dangle */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { UsersService } from '@modules/users/users.service';

import { AddMemberDto } from './dto/add-member.dto';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { Trip, TripDocument } from './schemas/trip.schema';

@Injectable()
export class TripsService {
  constructor(
    @InjectModel(Trip.name) private tripModel: Model<TripDocument>,
    private usersService: UsersService
  ) {}

  create(createTripDto: CreateTripDto) {
    const createdTrip = new this.tripModel(createTripDto);
    return createdTrip.save();
  }

  findAll(userId: string) {
    return this.tripModel.find({ members: { $in: [userId] } }).exec();
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

  async addMember(id: string, addMemberDto: AddMemberDto) {
    const addUser = await this.usersService.findByEmail(addMemberDto.email);
    if (!addUser) {
      return new BadRequestException('User not found');
    }
    const trip = await this.tripModel.findById(id).exec();
    if (trip.members.includes(addUser._id)) {
      return new BadRequestException('User already in trip');
    }
    return this.tripModel.findByIdAndUpdate(id, { $push: { members: addUser._id } }, { new: true }).exec();
  }
}
