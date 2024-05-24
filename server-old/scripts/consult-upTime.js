require('dotenv').config({path: "../.env"});

function consultUpTime(ipHost) {
    const dayjs = require('dayjs');
    var snmp = require('net-snmp');

    const communityHost = process.env.COMMUNITY_HOST;
    var result = new Object;
    var cont = 0;
    
    var session = snmp.createSession(ipHost, communityHost);

    /* if (ipHost.startsWith('200') == true){
        //var oid = "1.3.6.1.4.1.2636.3.35.1.1.1.3"
    
        var oid = "1.3.6.1.2.1.1";
    }else{
        var oid = "1.3.6.1.2.1.1";

    } */
    
    var oid = "1.3.6.1.2.1.1";

    function doneCb (error) {
        if (error)
            console.error (error.toString ());
    };

    function feedCb (varbinds) {
        for (var i = 0; i < varbinds.length; i++) {
            if (snmp.isVarbindError (varbinds[i]))
                console.error (snmp.varbindError (varbinds[i]));
            else {
                valor = varbinds[i].value;
                oid = varbinds[i].oid;

                console.log(`${oid} | ${valor}`)

                switch (cont) {
                    case 0:
                        result.description = valor.toString()
                        break
                    case 1:
                        result.objectID = valor
                        break
                    case 2:
                        result.upTime = dayjs().subtract(valor*0.01, 'second').format('DD/MM/YYYY HH:mm:ss')
                        console.log(valor*0.01/60/60)
                        break
                    case 3:
                        result.contact = valor.toString()
                        break
                    case 4:
                        result.hostname = valor.toString()
                        break
                    case 6:
                        result.sysServices = valor
                        break
                }

                cont ++;
            }   
        }  
    };
    var maxRepetitions = 20;
    session.subtree (oid, maxRepetitions, feedCb, doneCb); 
    

    setTimeout(()=> {
        console.log(result)
    }, 1000);

}

consultUpTime("200.18.80.186");

module.exports = consultUpTime;

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
    Retorna: sysServices

*/