import { Test, TestingModule } from '@nestjs/testing';
import { QueryLogsService } from './query-logs.service';

describe('QueryLogsService', () => {
  let service: QueryLogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QueryLogsService],
    }).compile();

    service = module.get<QueryLogsService>(QueryLogsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
