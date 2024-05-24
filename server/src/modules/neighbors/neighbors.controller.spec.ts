import { Test, TestingModule } from '@nestjs/testing';
import { NeighborsController } from './neighbors.controller';

describe('NeighborsController', () => {
  let controller: NeighborsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NeighborsController],
    }).compile();

    controller = module.get<NeighborsController>(NeighborsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
