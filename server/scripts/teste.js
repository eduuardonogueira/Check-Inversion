//1.3.6.1.2.1.1.5.0
require('dotenv').config({ path: '../../.env'});



function consult(ip) {
    var snmp = require('net-snmp');

    const ipHost = ip
    const communityHost = process.env.COMMUNITY_HOST

    var session = snmp.createSession(ipHost, communityHost);

    var oid = "1.3.6.1.2.1.1.3.0";
    
    function doneCb (error) {
        if (error)
            console.error (error.toString ());
    }
    
    function feedCb (varbinds) {
        for (var i = 0; i < varbinds.length; i++) {
            if (snmp.isVarbindError (varbinds[i]))
                console.error (snmp.varbindError (varbinds[i]));
            else
                console.log (varbinds[i].oid + "|" + varbinds[i].value);
        }
    }
    
    var maxRepetitions = 20;
    
    // The maxRepetitions argument is optional, and will be ignored unless using
    // SNMP verison 2c
    session.subtree (oid, maxRepetitions, feedCb, doneCb);
}

consult('200.139.32.98');