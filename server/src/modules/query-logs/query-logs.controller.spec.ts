import { Test, TestingModule } from '@nestjs/testing';
import { QueryLogsController } from './query-logs.controller';

describe('QueryLogsController', () => {
  let controller: QueryLogsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QueryLogsController],
    }).compile();

    controller = module.get<QueryLogsController>(QueryLogsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
