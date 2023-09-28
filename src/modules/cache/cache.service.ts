import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';

import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  async get(key: string) {
    console.log(`GET ${key} from REDIS`);
    return await this.cache.get(key);
  }

  async set(key: string, value: unknown, ttl = 30000) {
    console.log(`set ${key} from REDIS`);
    return await this.cache.set(key, value, ttl);
  }

  async del(key: string) {
    console.log(`del ${key} from REDIS`);
    return await this.cache.del(key);
  }

  async getOrSet(key: string, cb) {
    const cachedData = await this.get(key);
    if (cachedData) {
      console.log('cache hit');
      return cachedData;
    }
    const data = await cb();

    await this.set(key, data);
    return data;
  }
}
