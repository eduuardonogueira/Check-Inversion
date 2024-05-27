import { NotFoundException, Injectable } from '@nestjs/common';
import { SnmpRepository } from './snmp.repository';
import { CustomRequestDto } from './dtos/custom-request.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SnmpService {
  constructor(
    private snmpRepository: SnmpRepository,
    private prismaService: PrismaService,
  ) {}

  async getHostInformation(ip: string) {
    const hostname = await this.snmpRepository.getHostname(ip);
    const neighbors = await this.snmpRepository.getNeighbor(ip);

    if (!hostname && !neighbors) {
      throw new NotFoundException('Internal server error');
    }

    const host = {
      hostname,
      ip,
      neighbors,
    };

    return host;
  }

  async snmpCustom(querys: CustomRequestDto) {
    const { ip, community, oid } = querys;
    const request = await this.snmpRepository.customConsult(ip, community, oid);

    if (!request) {
      throw new NotFoundException('Internal server error');
    }

    return request;
  }
}
