import { Injectable, HttpException } from '@nestjs/common';
import { Varbinds } from './helpers/types';

@Injectable()
export class SnmpMethods {
  async subtree(
    ip: string,
    community: string,
    oid: string,
  ): Promise<Varbinds[]> {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const snmp = require('net-snmp');
      const session = snmp.createSession(ip, community);
      const result: Varbinds[] = [];

      function doneCb(error: any) {
        if (error) {
          console.error(error.toString());
          reject(new HttpException(error.toString(), 504));
        }
        resolve(
          result.map((varbind: Varbinds) => ({
            ...varbind,
            value:
              varbind.type === 4 ? varbind.value.toString() : varbind.value,
          })),
        );
      }

      function feedCb(varbinds: Varbinds[]) {
        for (let i = 0; i < varbinds.length; i++) {
          if (snmp.isVarbindError(varbinds[i]))
            resolve(snmp.varbindError(varbinds[i])),
              console.error(snmp.varbindError(varbinds[i]));
          else {
            console.log(
              varbinds[i].oid +
                ' || ' +
                varbinds[i].type +
                ' || ' +
                varbinds[i].value.toString(),
            );
            result.push(varbinds[i]);
          }
        }
      }

      const maxRepetitions = 20;
      session.subtree(oid, maxRepetitions, feedCb, doneCb);
    });
  }

  async get(
    ip: string,
    community: string,
    oids: string | string[],
  ): Promise<Varbinds[]> {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const snmp = require('net-snmp');
      const session = snmp.createSession(ip, community);

      function responseCb(error: any, varbinds: Varbinds[][]) {
        if (error) {
          if (error) {
            console.error(error.toString());
            reject(new HttpException(error.toString(), 504));
          } else {
            if (snmp.isVarbindError(varbinds[0])) {
              console.error(snmp.varbindError(varbinds[0]));
            }
            resolve(varbinds[0]);
          }
        }
      }

      session.get(oids, responseCb);
    });
  }
}
