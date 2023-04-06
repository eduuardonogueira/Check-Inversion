var snmp = require ("net-snmp");

const ip = ["172.16.17.1","172.16.11.4","172.16.11.2","172.16.8.1","172.16.5.1","172.16.16.1",
           "172.16.18.1","172.16.17.20","172.16.9.2","172.16.9.1","172.16.9.100","172.16.6.3",
           "172.16.6.1","172.16.6.2","172.16.8.2",];


const check = [];

var count = 0;

function checkFibra() {
    var session = snmp.createSession (ip[count] , "v1a1pe@RNPcom91");

    var consulta = [];
    var ips = [];
    var host;
    var neighborsArray = [];
    var portsArray = [];
    var stacksArray = [];
    var remotePortsArray = [];


    function searchHostname() {
        var oid = "1.3.6.1.2.1.1.5";
    
        function doneCb (error) {
            if (error)
                console.error (error.toString ());
        }
    
        function feedCb (varbinds) {
    
            for (var i = 0; i < varbinds.length; i++) {
                if (snmp.isVarbindError (varbinds[i]))
                    console.error (snmp.varbindError (varbinds[i]));
                else
                    host = varbinds[i].value.toString('utf-8');
            }
        }
        var maxRepetitions = 20;
        session.subtree (oid, maxRepetitions, feedCb, doneCb);
    }

    searchHostname();

    var oid = "1.3.6.1.4.1.1916.1.13.2.1";

    function doneCb (error) {
        if (error)
            console.error (error.toString ());
    }
    
    function feedCb (varbinds) {
        for (var i = 0; i < varbinds.length; i++) {
            if (snmp.isVarbindError (varbinds[i]))
                console.error (snmp.varbindError (varbinds[i]));
            else {
                arq = varbinds[i].oid;
                const port = arq[30]+arq[31];
    
                const neighborsfind = varbinds.filter(function(objeto) {
                    return objeto.oid.startsWith('1.3.6.1.4.1.1916.1.13.2.1.3');
                })
    
                const stackFind = varbinds.filter(function(objeto) {
                    return objeto.oid.startsWith('1.3.6.1.4.1.1916.1.13.2.1.5');
                })
    
                const remotePortFind = varbinds.filter(function(objeto) {
                    return objeto.oid.startsWith('1.3.6.1.4.1.1916.1.13.2.1.6');
                })
    
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
    
            for (var j = 0; j < neighborsEmpty.length; j++){
                ips.push(ip[count]);
                exist(neighborsEmpty[j], neighbors, 'text');
                ports.push(portsArray[j]);      
                exist(remotePortsEmpty[j], remotePorts, 'port', stacksEmpty[j]);
            } 
    
            setTimeout(() => {
                for (var k = 0; k < neighbors.length; k++){
                    const table = new Object();
                    table.ip = ips[0];
                    table.host = host;
                    table.port = ports[k];
                    table.neighbor = neighbors[k]; 
                    table.remotePort = remotePorts[k];
                    consulta.push(table)
                }
                
                setTimeout(() =>{
                    if(consulta.length === 0 ) {
                        consulta = ["RequestTimedOutError"];
                        console.log(`host ${ip[count]} falhou`)
                    }else{
                        
                        console.log(`host ${ip[count]} consultado`)
                    }
                    check.push(consulta)
                },100) 
            },100)
        }, 100);
    },3000)

    setTimeout(() => {
        count++
        if(count<ip.length){
            setImmediate(checkFibra)
            
        }
    }, 5000);

}

checkFibra()

setTimeout(()=> {
    var checkJSON = JSON.stringify(check);
    
    const fs = require('fs');
    fs.writeFile('checkFibra.json', checkJSON, function (err) {
        if (err) throw err;
        console.log('Consulta finalizada')
    })

},5000 * ip.length + 5000)













