import { HttpException, Injectable } from '@nestjs/common';
import { oidTable } from './helpers/oidTable';
import { Varbinds } from './helpers/types';
import { SnmpMethods } from './snmp.methods';

export interface Gbic {
  id: number;
  port?: number;
  items: {
    id: number;
  }[];
}

@Injectable()
export class SnmpRepository {
  constructor(private snmpMethods: SnmpMethods) {}

  async getHostname(ip: string) {
    try {
      const consult = await this.snmpMethods.subtree(
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
      const result = await this.snmpMethods.subtree(
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
    return varbinds.filter((varbind) => varbind.oid.startsWith(oid));
  }

  getLastOidNumber(varbinds: Varbinds[]) {
    return varbinds
      .map((varbind) => {
        const lastNumber = varbind.oid.split('.').pop();
        if (lastNumber.length === 3) return lastNumber;
      })
      .filter((item) => item);
  }

  async testOID(ip: string) {
    // const ports = await this.snmpMethods.subtree(
    //   ip,
    //   'v1a1pe@RNPcom91',
    //   '1.3.6.1.2.1.2.2.1.2',
    // );

    // const portsIndex = ports
    //   .map((item) => {
    //     const lastInformation = item.oid.split('.').pop();
    //     if (lastInformation.length === 4) return lastInformation;
    //   })
    //   .filter((item) => item);

    // const portsMap = await this.snmpMethods.subtree(
    //   ip,
    //   'v1a1pe@RNPcom91',
    //   '1.3.6.1.2.1.47.1.3.2.1.2',
    // );

    // const portsMap = await this.snmpMethods.subtree(
    //   ip,
    //   'v1a1pe@RNPcom91',
    //   '1.3.6.1.2.1.47.1.3.2.1.2',
    // );

    const description = await this.snmpMethods.subtree(
      ip,
      'v1a1pe@RNPcom91',
      '1.3.6.1.2.1.47.1.1.1.1.4',
    );

    const gbicArray: Gbic[] = [];
    const itemsIndex: Gbic['items'] = [];

    description.forEach((varbind: Varbinds, index: number) => {
      if (typeof varbind.value === 'number') {
        if (varbind.value - 3 < 1 || varbind.value.toString().length > 2)
          return;
        const portIndex = varbind.value;

        console.log(portIndex);

        const lastOidNumber = parseInt(varbind.oid.split('.').pop());
        itemsIndex.push({ id: lastOidNumber });

        if (description[index - 1].value !== description[index - 2].value) {
          gbicArray.push({
            id: portIndex,
            port: portIndex - 3,
            items: [...itemsIndex],
          });
          itemsIndex.length = 0;
        }
      }
    });

    // {
    //   id: description.value;
    //   port: description.value - 3;
    //   items: [
    //     {
    //       id: lastOidNumber,
    //     },
    //   ];
    // }

    // const valuesId = this.getLastOidNumber(description);

    // 1.3.6.1.2.1.2.2.1.2 -
    // 1.3.6.1.2.1.47.1.1.1.1.4 - indice dos items

    // 1.3.6.1.2.1.2.2.1.2 mapeamento das portas
    // 1.3.6.1.2.1.47.1.3.2.1.2 indices das portas
    // 1.3.6.1.2.1.47.1.1.1.1 mapeamento das descrições
    // 1.3.6.1.2.1.99.1.1.1.4 mapeamento dos valores das portas

    // console.log('finalizado');
    return gbicArray;

    // id - porta
    // id - items

    // 1.3.6.1.2.1.47.1.1.1.1.2. + indice da porta - Velocidade do Gbic - 10 Gbps Ethernet Port
    // 1.3.6.1.2.1.47.1.1.1.1.2. + indice do items - Nome do item - SFP TX Bias Current Sensor
    // 1.3.6.1.2.1.47.1.1.1.1.6 - numero da porta
    // 1.3.6.1.2.1.47.1.1.1.1.11 - SK1BE5137926
    // 1.3.6.1.2.1.47.1.1.1.1.12 - marca gbic
    // 1.3.6.1.2.1.47.1.1.1.1.13 - modelo gbic
    //
  }

  async customConsult(ip: string, community: string, oid: string) {
    try {
      const result = await this.snmpMethods.subtree(ip, community, oid);
      console.log('oioio');
      console.log(result);
      return result;
    } catch (error) {
      console.error('Error in custom consultation: ', error);
      throw new HttpException(error || 'Internal server error', 500);
    }
  }
}
