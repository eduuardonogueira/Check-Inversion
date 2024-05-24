import { Test, TestingModule } from '@nestjs/testing';
import { NeighborsService } from './neighbors.service';

describe('NeighborsService', () => {
  let service: NeighborsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NeighborsService],
    }).compile();

    service = module.get<NeighborsService>(NeighborsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
