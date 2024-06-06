import { Module } from '@nestjs/common';
import { SnmpController } from './snmp.controller';
import { SnmpService } from './snmp.service';
import { PrismaService } from '../prisma/prisma.service';
import { SnmpRepository } from './snmp.repository';
import { SnmpMethods } from './snmp.methods';

@Module({
  controllers: [SnmpController],
  providers: [SnmpService, SnmpRepository, PrismaService, SnmpMethods],
})
export class SnmpModule {}
