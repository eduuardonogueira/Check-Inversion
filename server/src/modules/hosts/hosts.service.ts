import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HostsService {
  constructor(private prisma: PrismaService) {}

  async findOne(id?: string, hostname?: string, ip?: string) {
    const host = await this.prisma.host.findUnique({
      where: { id, hostname, ip },
    });

    if (!host) {
      throw new NotFoundException('Host not found');
    }

    return host;
  }

  async findAll(page, pageSize, filter) {
    const hosts = await this.prisma.findMany();

    if (!hosts) {
      throw new NotFoundException('Host not found');
    }

    return hosts;
  }
}
