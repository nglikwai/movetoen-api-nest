import { Injectable } from '@nestjs/common';

import { Counter } from './interfaces/counter.interface';
import { MongoService } from './mongo.service';

@Injectable()
export class CounterHandlerService {
  constructor(private readonly mongoService: MongoService) {}

  async createOrIncrCounterByKey(key: string): Promise<Partial<Counter>> {
    const conditions = { key };
    const update = {
      key,
      $inc: { seq: 1 },
    };
    const options = { upsert: true, new: true };
    const createdResult = await this.mongoService.update({
      conditions,
      update,
      options,
    });
    return createdResult;
  }

  async getCounterByKey(key: string): Promise<Partial<Counter>> {
    const filter = { key };
    const createdResult = await this.mongoService.findOne({ filter });
    return createdResult;
  }
}
