import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { ModelBaseService } from '@models/base.service';

import { Counter } from './interfaces/counter.interface';

@Injectable()
export class MongoService extends ModelBaseService<Counter> {
  constructor(@InjectModel('Counters') readonly counterModel: Model<Counter>) {
    super(counterModel);
  }
}
