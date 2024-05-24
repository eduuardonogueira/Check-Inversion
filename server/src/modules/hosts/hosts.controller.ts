import { Controller, Get } from '@nestjs/common';

@Controller('hosts')
export class HostsController {
  @Get('/')
  getAllHost() {
  }

  
}
