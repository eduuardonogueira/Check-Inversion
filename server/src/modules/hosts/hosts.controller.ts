import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { HostsService } from './hosts.service';
import { CreateHostDto } from './dtos/create-host.dto';
import { UpdateHostDto } from './dtos/update-host.dto';

@Controller('host')
export class HostsController {
  constructor(private hostsService: HostsService) {}
  @Get('/:id')
  getHost(@Param('id') id: string) {
    return this.hostsService.findOne(id);
  }

  @Post('/create')
  createHost(@Body() data: CreateHostDto) {
    return this.hostsService.create(data);
  }

  @Patch('/:id')
  updateHost(@Param('id') id: string, @Body() data: UpdateHostDto) {
    return this.hostsService.update(id, data);
  }

  @Delete(':id')
  removeHost(@Param('id') id: string) {
    return this.hostsService.delete(id);
  }
}
