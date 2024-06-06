import { Controller, Get, Param, Query, ValidationPipe } from '@nestjs/common';
import { SnmpService } from './snmp.service';
import { CustomRequestDto } from './dtos/custom-request.dto';

@Controller('snmp')
export class SnmpController {
  constructor(private snmpService: SnmpService) {}

  @Get('/eaps/:ip')
  eapsRequest(@Param('ip') ip: string) {
    return this.snmpService.getEaps(ip);
  }

  @Get('/uptime/:ip')
  uptimeRequest(@Param('ip') ip: string) {
    return this.snmpService.getUptime(ip);
  }

  @Get('/test/:ip')
  testRequest(@Param('ip') ip: string) {
    return this.snmpService.testSnmpOID(ip);
  }

  @Get('/custom')
  customRequest(
    @Query(new ValidationPipe({ whitelist: true })) querys: CustomRequestDto,
  ) {
    console.log(querys);
    return this.snmpService.snmpCustom(querys);
  }
}
