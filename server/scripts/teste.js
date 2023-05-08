function consultHost(ip, community) {
    var snmp = require('net-snmp');

    const ipHost = ip;
    const communityHost = community

    var session = snmp.createSession(ipHost, communityHost);

    var oid = "1.3.6.1.4.1.1916.1.13";

    function doneCb (error) {
        if (error)
            console.error (error.toString ());
    }

    function feedCb (varbinds) {
        for (var i = 0; i < varbinds.length; i++) {
            if (snmp.isVarbindError (varbinds[i]))
                console.error (snmp.varbindError (varbinds[i]));
            else {
                oid = varbinds[i].oid;
                valor = varbinds[i].value;

                console.log(`${oid} | ${valor}`)
            

            const filtro = varbinds.filter( obj => (obj.oid.endsWith("109.116")))

            /* console.log(filtro) */
            }   
        }  
    }
    var maxRepetitions = 20;
    session.subtree (oid, maxRepetitions, feedCb, doneCb); 
}

consultHost('172.16.8.2', "v1a1pe@RNPcom91")


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

    -----------------------------------------------
    
    

*/