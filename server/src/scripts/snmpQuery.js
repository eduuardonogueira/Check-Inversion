require('dotenv').config({ path: '../../.env' });

class Consult {
  hostname;

  async snmpConsultHostname(ip, community) {
    return new Promise((resolve, reject) => {
      var snmp = require('net-snmp');
      const oids = ['1.3.6.1.2.1.1.5.0', '1.3.6.1.2.1.1.6.0'];

      var session = snmp.createSession(ip, community);

      session.getNext(oids, function (error, varbinds) {
        if (error) {
          console.error(error.toString());
        } else {
          for (var i = 0; i < varbinds.length; i++) {
            if (snmp.isVarbindError(varbinds[i]))
              console.error(snmp.varbindError(varbinds[i]));
            else {
              this.hostname = varbinds[i].oid + '|' + varbinds[i].value;
            }
          }
        }
      });

      session.on('close', () => {
        resolve(this.hostname);
      });
      // resolve(this.hostname);
    });
  }

  async getHostname(ip, community) {
    try {
      const hostname = await this.snmpConsultHostname(ip, community);
      return hostname;
    } catch (error) {
      console.error(error);
    }
  }
}

const getConsult = new Consult();

getConsult
  .getHostname('172.16.8.2', 'v1a1pe@RNPcom91')
  .then((res) => console.log(res));

// const data = {
//   hostname: 'ITV',
//   ip: '172.16.8.2',
//   neighbors: [
//     {
//       hostname: 'CPRM',
//       port: '27',
//       remotePort: '1:24',
//     },
//     {
//       hostname: 'Core-Metrobel',
//       port: '27',
//       remotePort: '2:7',
//     },
//   ],
// };

// console.log(data);
// module.exports = consultHost;

/* 
    OID: "1.3.6.1.4.1.1916.1.13.2.1.3"
    Retorna: Nome dos vizinhos

    OID: "1.3.6.1.4.1.1916.1.13.2.1.4" 
    Retorna: Systema operacional dos vizinhos

    OID: "1.3.6.1.4.1.1916.1.13.2.1.5"
    Retorna: Stack da porta remota

    OID: "1.3.6.1.4.1.1916.1.13.2.1.6"
    Retorna: Porta remota

    OID: "1.3.6.1.4.1.1916.1.13.2.1.7" 
    Retorna: tempo em segundos da consulta
*/
