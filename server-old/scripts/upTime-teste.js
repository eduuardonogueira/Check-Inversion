require('dotenv').config({path: "../.env"});

function consult(ipHost) {
    var snmp = require('net-snmp');

    const communityHost = process.env.COMMUNITY_HOST

    console.log(communityHost, ipHost)
    var session = snmp.createSession(ipHost, communityHost);

    //var oid = "1.3.6.1.4.1.2636.3.2.1.1"
    var oid = "1.3.6.1.4.1.2636.3.35.1.1.1.3";
    
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
    session.subtree (oid, maxRepetitions, feedCb, doneCb);
}

consult('200.18.80.102');


// link das MIBS: https://apps.juniper.net/mib-explorer/navigate?software=Junos%20OS&release=23.2R1&name=mplsVersion&oid=1.3.6.1.4.1.2636.3.2.1.1