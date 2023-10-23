import { Test, TestingModule } from '@nestjs/testing';
import { PlannersController } from './planners.controller';
import { PlannersService } from './planners.service';

describe('PlannersController', () => {
  let controller: PlannersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlannersController],
      providers: [PlannersService],
    }).compile();

    controller = module.get<PlannersController>(PlannersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
