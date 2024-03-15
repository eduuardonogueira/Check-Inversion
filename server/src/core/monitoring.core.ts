import { PrismaClient } from "@prisma/client"
import dayjs from 'dayjs';
import consultHost from "../../scripts/consult-host";

const prisma = new PrismaClient()

type Query = {
    hostname: string,
    neighbor: string,
    ip: string,
    port: string,
    remotePort: string,
    createdAt: string,
    status: string
}

type neighborDB = {
    hostname: string,
    port: string,
    remotePort: string,
}

export const monitoring = async() => {
    function compareLink( value1: neighborDB, value2: Query ) {

        console.log("\n\nbanco de dados:\n",{
            hostname: value1.hostname,
            port: value1.port,
            remotePort: value1.remotePort
        })
        console.log("consulta:\n",{
            hostname: value2.neighbor,
            port: value2.port,
            remotePort: value2.remotePort
        })


        if (value1.hostname !== value2.neighbor || value1.port !== value2.port || value1.remotePort !== value2.remotePort) {
            return 'Invertido' 
        } else {
            return 'Ok'
        }
    }

    const hostsDB = await prisma.host.findMany({
        include: {
            neighbors: true,
        }
    })

    var host = 0

    async function queryHost() {
        async function register( neighbor: neighborDB , status: string ) {

            console.log("\n",neighbor, status)
            await prisma.neighborQuery.create({
                data: {
                    host: { connect: { id: hostsDB[host].id } },
                    hostname: neighbor.hostname,
                    port: neighbor.port,
                    remotePort: neighbor.remotePort,
                    status: status,
                    createdAt: hour
                }
            })
        }

        const hour = dayjs().format('YYYY-MM-DDTHH:mm:ss.SSS'+'[Z]');
        const hostQuery: Query[] = await consultHost(hostsDB[host].ip);

        var link = 0;

        function checkLink() {
            if ( link < hostsDB[host].neighbors.length ) {
                setTimeout( async () => {
                    const neighborDB = hostsDB[host].neighbors[link];

                    var findLink = hostQuery.find((neighbor) => ( neighbor.port == neighborDB.port && neighbor ))
    
                    if (findLink) {
                        // link encontrado
                        const status = compareLink(neighborDB, findLink)
    
                        register({
                            hostname: findLink.neighbor,
                            port: findLink.port,
                            remotePort: findLink.remotePort
                        }, status)
                        findLink = undefined
                    } else {
                        // link donw
                        register(neighborDB, "Down")
                    }

                    link ++
                    setImmediate(checkLink)
                }, 1000 )
            }   
        }

        checkLink()
        
        setTimeout(() => {
            if ( host < hostsDB.length - 1) {
                host ++
                setImmediate(queryHost)
            }
        }, 10000)
    }
        
    hostsDB.length == 0 ? '' : queryHost()

    setTimeout(monitoring, 30 * 60 * 1000)
};
