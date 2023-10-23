import { Test, TestingModule } from '@nestjs/testing';
import { PlannersService } from './planners.service';

describe('PlannersService', () => {
  let service: PlannersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlannersService],
    }).compile();

    service = module.get<PlannersService>(PlannersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
