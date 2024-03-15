const consulta = [
                    {
                        ip: '172.16.8.2',
                        hostname: 'ITV',
                        port: '28',
                        neighbor: 'Core-Metrobel',
                        remotePort: '2:7'
                    }
                ]

var banco = [
                    {
                        ip: '172.16.8.2',
                        hostname: 'ITV',
                        port: '27',
                        neighbor: 'CPRM-1',       
                        remotePort: '1:24'        
                    },
                    {
                        ip: '172.16.8.2',
                        hostname: 'ITV',
                        port: '28',
                        neighbor: 'Core-Metrobel',
                        remotePort: '2:7'
                    }
                ]
var link = 0

function checkLink() {

    if(link < banco.length) {
        const neighborDB = banco[link]
        const neighborQuery = consulta

        setTimeout(() => {

            const findLink = consulta.find((neighbor) => (
                neighbor.port === neighborDB.port
            ))

            if (findLink) {
                console.log(findLink)

            } else {
                
                console.log("link não encontrado")
            }

            link ++
            setImmediate(checkLink)
        }, 500)
    }
}

checkLink()