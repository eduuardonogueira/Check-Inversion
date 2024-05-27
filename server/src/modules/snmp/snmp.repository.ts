import { HttpException, Injectable } from '@nestjs/common';
import { oidTable } from './helpers/oidTable';
import { Varbinds } from './helpers/types';

@Injectable()
export class SnmpRepository {
  async snmpConsultHostname(
    ip: string,
    community: string,
    oid: string,
  ): Promise<Varbinds[]> {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const snmp = require('net-snmp');
      const session = snmp.createSession(ip, community);
      const result = [];

      function doneCb(error: any) {
        if (error) {
          console.error(error.toString());
          reject(new HttpException(error.toString(), 504));
        }
        resolve(result);
      }

      function feedCb(varbinds: any) {
        for (let i = 0; i < varbinds.length; i++) {
          if (snmp.isVarbindError(varbinds[i]))
            resolve(snmp.varbindError(varbinds[i])),
              console.error(snmp.varbindError(varbinds[i]));
          else {
            result.push(varbinds[i]);
          }
        }
      }

      const maxRepetitions = 20;
      session.subtree(oid, maxRepetitions, feedCb, doneCb);
    });
  }

  async getHostname(ip: string) {
    try {
      const consult = await this.snmpConsultHostname(
        ip,
        'v1a1pe@RNPcom91',
        oidTable.hostname,
      );

      const hostname = consult[0].value.toString();
      return hostname;
    } catch (error) {
      console.error('Error getting hostname: ', error);
      throw new HttpException(error || 'Internal server error', 500);
    }
  }

  async getNeighbor(ip: string) {
    try {
      const result = await this.snmpConsultHostname(
        ip,
        'v1a1pe@RNPcom91',
        oidTable.eaps,
      );

      const neighbors = this.filterByOid(result, oidTable.neighbor.hostname);
      const stacks = this.filterByOid(result, oidTable.neighbor.stack);
      const remotePorts = this.filterByOid(
        result,
        oidTable.neighbor.remotePort,
      );
      const ports = neighbors.map(
        (_, index) => result[index].oid[30] + result[index].oid[31],
      );

      const data = neighbors.map((_, index) => ({
        hostname: neighbors[index],
        port: ports[index],
        remotePort: `${stacks[index]}:${remotePorts[index]}`,
      }));

      return data;
    } catch (error) {
      console.error('Error getting neighbors: ', error);
      throw new HttpException(error || 'Internal server error', 500);
    }
  }

  filterByOid(varbinds: Varbinds[], oid: string) {
    return varbinds
      .filter((varbind) => varbind.oid.startsWith(oid))
      .map((varbind) => varbind.value.toString());
  }

  async customConsult(ip: string, community: string, oid: string) {
    try {
      const result = await this.snmpConsultHostname(ip, community, oid);
      console.log('oioio');
      console.log(result);
      return result;
    } catch (error) {
      console.error('Error in custom consultation: ', error);
      throw new HttpException(error || 'Internal server error', 500);
    }
  }
}
