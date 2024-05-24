import { Module } from '@nestjs/common';
import { QueryLogsController } from './query-logs.controller';
import { QueryLogsService } from './query-logs.service';

@Module({
  controllers: [QueryLogsController],
  providers: [QueryLogsService]
})
export class QueryLogsModule {}
