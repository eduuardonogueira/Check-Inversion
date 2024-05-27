import { Controller, Get, Param, Query, ValidationPipe } from '@nestjs/common';
import { SnmpService } from './snmp.service';
import { CustomRequestDto } from './dtos/custom-request.dto';

@Controller('snmp')
export class SnmpController {
  constructor(private snmpService: SnmpService) {}

  @Get('/:ip')
  request(@Param('ip') ip: string) {
    return this.snmpService.getHostInformation(ip);
  }

  @Get('/custom')
  customRequest(
    @Query(new ValidationPipe({ whitelist: true })) querys: CustomRequestDto,
  ) {
    console.log(querys);
    return this.snmpService.snmpCustom(querys);
  }
}
