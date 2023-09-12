require('dotenv').config({ path: '../../.env'});
const dayjs = require('dayjs')

function consultHost(ip) {
    var snmp = require('net-snmp');

    const ipHost = ip;
    const communityHost = process.env.COMMUNITY_HOST
    var result = new Object
    var cont = 0;


    var session = snmp.createSession(ipHost, communityHost);
    var oid = "1.3.6.1.4.1.2636.3.1.5.0"

    function doneCb (error) {
        if (error)
            console.error (error.toString ());
    }

    function feedCb (varbinds) {
        for (var i = 0; i < varbinds.length; i++) {
            if (snmp.isVarbindError (varbinds[i]))
                console.error (snmp.varbindError (varbinds[i]));
            else {
                valor = varbinds[i].value;
                oid = varbinds[i].oid;


                console.log(valor, oid);

                switch (cont) {
                    case 0:
                        result.description = valor.toString()
                        break
                    case 1:
                        result.objectID = valor
                        break
                    case 2:
                        result.upTime = dayjs().subtract(valor*0.01, 'second').format('DD/MM/YYYY HH:mm:ss')
                        break
                    case 3:
                        result.contact = valor.toString()
                        break
                    case 4:
                        result.hostname = valor.toString()
                        break
                    case 6:
                        break
                }

                cont ++;
            }   
        }  
    }
    var maxRepetitions = 20;
    session.subtree (oid, maxRepetitions, feedCb, doneCb); 
    

    setTimeout(()=> {
        console.log(result)
    }, 1000)

}

consultHost('200.18.80.134')



//1.3.6.1.2.1.1
/* 
    OID: "1.3.6.1.2.1.1.1.0"
    Retorna: Descrição

    OID: "1.3.6.1.2.1.1.2.0" 
    Retorna: Object ID

    OID: "1.3.6.1.2.1.1.3.0"
    Retorna: UpTime do sistema

    OID: "1.3.6.1.2.1.1.4.0"
    Retorna: Email e contato

    OID: "1.3.6.1.2.1.1.5.0" 
    Retorna: hostname

    OID: "1.3.6.1.2.1.1.7.0" 
    Retorna: 

*/





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