
function consultHost(ip) {
    return new Promise((resolve, reject) => {
        
    var snmp = require ("net-snmp");

    const ipHost = ip;

    var session = snmp.createSession (ipHost , "v1a1pe@RNPcom91");

    var consulta = [];
    var ips = [];
    var host;
    var neighborsArray = [];
    var portsArray = [];
    var stacksArray = [];
    var remotePortsArray = [];
    var arq

    async function searchHostname() {
        var oid = "1.3.6.1.2.1.1.5";

        function doneCb (error) {
            if (error)(
                console.error(error.toString()),
                resolve(error.toString())
            )
        }

        function feedCb (varbinds) {

            for (var i = 0; i < varbinds.length; i++) {
                if (snmp.isVarbindError (varbinds[i]))(
                    resolve(snmp.varbindError(varbinds[i])),
                    console.error(snmp.varbindError(varbinds[i]))
                )
                else
                    host = varbinds[i].value.toString('utf-8');
            }
        }
        var maxRepetitions = 20;
        session.subtree (oid, maxRepetitions, feedCb, doneCb);
    }

    searchHostname()

    oid = "1.3.6.1.4.1.1916.1.13.2.1";

    function doneCb (error) {
        if (error)(
            resolve(error.toString()),
            console.error(error.toString())
        )
    }

    function feedCb (varbinds) {
        for (var i = 0; i < varbinds.length; i++) {
            if (snmp.isVarbindError (varbinds[i]))(
                resolve(snmp.varbindError (varbinds[i])),
                console.error(snmp.varbindError(varbinds[i]))  
            )
            else {
                arq = varbinds[i].oid;
                const port = arq[30]+arq[31];

                const neighborsfind = varbinds.filter( obj => (obj.oid.startsWith('1.3.6.1.4.1.1916.1.13.2.1.3')));

                const stackFind = varbinds.filter( obj => (obj.oid.startsWith('1.3.6.1.4.1.1916.1.13.2.1.5')));

                const remotePortFind = varbinds.filter( obj => (obj.oid.startsWith('1.3.6.1.4.1.1916.1.13.2.1.6')));

                neighborsArray.push(neighborsfind);
                stacksArray.push(stackFind);
                portsArray.push(port);
                remotePortsArray.push(remotePortFind);
            }
        }      
    }

    var maxRepetitions = 20;
    session.subtree (oid, maxRepetitions, feedCb, doneCb);  

    setTimeout(() => {
        const neighborsFilter = neighborsArray.filter(function(array){
            return array.length > 0;
        });
        const neighborsEmpty = neighborsFilter.flat()

        const stacksFilter = stacksArray.filter(function(array){
            return array.length > 0;
        });
        const stacksEmpty = stacksFilter.flat()

        const remotePortsFilter = remotePortsArray.filter(function(array){
            return array.length > 0;
        });
        const remotePortsEmpty = remotePortsFilter.flat()
        
        var neighbors = [];
        var ports = [];
        var remotePorts = [];

        setTimeout(() => {
            function exist(object, receiver, text, object2) { 
                if (object == undefined) {
                    receiver.push('vazio')
                }
                else {
                    if (text == 'text') {
                        receiver.push(object.value.toString());
                    }
                    else {
                        if (text == 'port') {
                            if (object2 == undefined){
                                receiver.push('vazio')
                            }
                            else {
                                receiver.push(object2.value + ":" + object.value)
                            }
                        }
                        else{
                            receiver.push(object.value)
                        }
                    }
                }
            }

            for (var count = 0; count < neighborsEmpty.length; count++){
                ips.push(ipHost);
                exist(neighborsEmpty[count], neighbors, 'text');
                ports.push(portsArray[count]);      
                exist(remotePortsEmpty[count], remotePorts, 'port', stacksEmpty[count]);
            } 

            setTimeout(() => {
                for (var j = 0; j < neighbors.length; j++){
                    const table = new Object();
                    table.ip = ips[0];
                    table.hostname = host;
                    table.port = ports[j];
                    table.neighbor = neighbors[j]; 
                    table.remotePort = remotePorts[j];
                    consulta.push(table);
                }
                setTimeout(() => {   
                    consulta.length == 0 ? '' : resolve(consulta); 
                }, 50);
            },50)
        }, 50);
    },2000)
})
}

module.exports = consultHost;
