import { Module } from '@nestjs/common';
import { HostsController } from './hosts.controller';
import { HostsService } from './hosts.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [HostsController],
  providers: [HostsService, PrismaService],
})
export class HostsModule {}
