import { PrismaClient } from '@prisma/client'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import consultHost  from '../scripts/consult-host.js'
import dayjs from 'dayjs';

const prisma = new PrismaClient()

export async function appRoutes(app: FastifyInstance) {
    
    const hour = dayjs().subtract(3, 'hour').toDate()

    async function monitorar(){
        function vef( value1: vefConsulta, value2: Consulta ){
            if (value1.neighbor !== value2.neighbor && value1.port !== value2.port && value1.remotePort !== value2.remotePort) {
                return 'Invertido'
            }

            return 'Ok'
        }

        const hostsDatabase = await prisma.host.findMany({
            include: {
                neighbors: true,
            }
        })

        var host = 0

        async function queryHost() {
            const hour = dayjs().format('YYYY-MM-DDTHH:mm:ss.SSS'+'[Z]');
            const hostQuery: Consulta[] = await consultHost(hostsDatabase[host].ip);
            
            var neighbor = 0;

            console.log(hostQuery[neighbor])
            function registrar() {
                if ( neighbor < hostsDatabase[host].neighbors.length ) {
                    const databaseNeighbor = hostsDatabase[host].neighbors[neighbor];
                    const queryNeighbor = hostQuery[neighbor];
                    const hostDown = queryNeighbor == null ? true : false

                    setTimeout( async () => {
                        await prisma.hostQuery.create({
                            data: {
                                host: { connect: { id: hostsDatabase[host].id } },
                                neighbor: hostDown ? databaseNeighbor.neighbor : queryNeighbor.neighbor,
                                port: hostDown ? databaseNeighbor.port : queryNeighbor.port,
                                remotePort: hostDown ? databaseNeighbor.remotePort : queryNeighbor.remotePort,
                                status: hostDown ? 'Down' : vef(databaseNeighbor, queryNeighbor) == 'Invertido' ? 'Invertido' : 'Ok',
                                createdAt: hour
                            }
                        })

                        neighbor ++
                        setImmediate(registrar)
                    }, 500 )
                }   
            }

            registrar()
            
            setTimeout(() => {
                if ( host < hostsDatabase.length - 1) {
                    host ++
                    setImmediate(queryHost)
                }
            }, 10000)
        }
            
        hostsDatabase.length == 0 ? '' : queryHost()

        setTimeout(monitorar, 30 * 60 * 1000)
    }

    //monitorar()

    function vefConsulta( value : bc[]) {
        value.map( host => (host.HostQueries.length == 0) ? host.HostQueries = ([{
            neighbor: 'consultando',
            port: 'consultando',
            remotePort: 'consultando',
            status: 'consultando',
            createdAt: hour, 
            id: '',
            hostId: ''
        }]): '' ) 

        return value
    }

    /* Rotas */
    app.get('/', async (req, res) => {
        return 'teste de carregamento'
    })

    app.get('/hosts', async (req, res) => {
        const hosts = await prisma.host.findMany({
            include: {
                neighbors: true,
            }
        })

        return hosts
    })

    app.get('/todos', async (req, res) => {
        const hour = dayjs().format('YYYY-MM-DDTHH:mm:ss.SSS'+'[Z]')
        const LastThirty = dayjs().subtract(30, 'minutes').format('YYYY-MM-DDTHH:mm:ss.SSS'+'[Z]')
        const hosts = await prisma.host.findMany()
        const todos = []

        for(const host of hosts) {
            const neighborsCount = await prisma.neighbor.count({
                where: {
                    hostId: host.id
                }
            })

            const HostQueries = await prisma.hostQuery.findMany({
                where: {
                    hostId: host.id,
                    createdAt: {
                        gte: LastThirty,
                        lte: hour
                    },
                },
                orderBy: {
                    createdAt: 'desc'
                },
                take: neighborsCount
            })

            todos.push({hostname: host.hostname, HostQueries: HostQueries})
            vefConsulta(todos)
        }

        return todos
    });

    app.get('/invertidos', async (req, res) => {
        const hour = dayjs().format('YYYY-MM-DDTHH:mm:ss.SSS'+'[Z]')
        const LastThirty = dayjs().subtract(30, 'minutes').format('YYYY-MM-DDTHH:mm:ss.SSS'+'[Z]')
        const hosts = await prisma.host.findMany()
        const invertidos = []

        for(const host of hosts) {
            const neighborsCount = await prisma.neighbor.count({
                where: {
                    hostId: host.id
                }
            })

            const HostQueries = await prisma.hostQuery.findMany({
                where: {
                    hostId: host.id,
                    status: 'Invertido',
                    createdAt: {
                        gte: LastThirty,
                        lte: hour
                    },
                },
                orderBy: {
                    createdAt: 'desc'
                },
                take: neighborsCount
            })

            HostQueries.length == 0 ? '' : invertidos.push({hostname: host.hostname, HostQueries: HostQueries})
        }

        return invertidos
    })

    app.get('/check-ok', async (req, res) => {
        const hour = dayjs().format('YYYY-MM-DDTHH:mm:ss.SSS'+'[Z]')
        const LastThirty = dayjs().subtract(30, 'minutes').format('YYYY-MM-DDTHH:mm:ss.SSS'+'[Z]')
        const hosts = await prisma.host.findMany()
        const checkOk = []

        for(const host of hosts) {
            const neighborsCount = await prisma.neighbor.count({
                where: {
                    hostId: host.id
                }
            })

            const HostQueries = await prisma.hostQuery.findMany({
                where: {
                    hostId: host.id,
                    status: 'Ok',
                    createdAt: {
                        gte: LastThirty,
                        lte: hour
                    },
                },
                orderBy: {
                    createdAt: 'desc'
                },
                take: neighborsCount
            })

            checkOk.push({hostname: host.hostname, HostQueries: HostQueries})
            vefConsulta(checkOk)
        }

        return checkOk
    })


    /* Consulta */
    app.get('/consultar/:ip', async (req) => {
        const createIpBody = z.object({
            ip: z.string()
        })

        const { ip } = createIpBody.parse(req.query)

        const consulta = await consultHost(ip)

        return consulta
    })


    // TODO: change the request information in invesao page
    app.get('/consultar/:name/:ip', async (req) => {
        const createDataBody = z.object({
            name: z.string(),
            ip: z.string(),
        })

        const { name, ip } = createDataBody.parse(req.body)

        const host = await prisma.host.findUnique({
            where: {
                ip: ip
            },
            include: {
                neighbors: {
                    where: {
                        neighbor: name
                    }
                }
            }
        })

        return host
    })

    /* Adicionar */
    app.post('/registrar', async (req) => {
        const horaAtual = dayjs().format('YYYY-MM-DDTHH:mm:ss.SSS'+'[Z]')

        const createRegistro = z.object({
            ip: z.string(),
        })

        const { ip } = createRegistro.parse(req.body)
        const neighbors = await consultHost(ip)

        try {
            await prisma.host.create({
                data: {
                    ip: ip,
                    hostname: neighbors[0].hostname,
                    createdAt: horaAtual,
                    updatedAt: horaAtual,
                    neighbors: { 
                        create: neighbors.map((item: any) => ({
                            neighbor: item.neighbor,
                            port: item.port,
                            remotePort: item.remotePort,
                            createdAt: horaAtual,
                            updatedAt: horaAtual
                        }))
                    },
                    HostQueries: {
                        create: neighbors.map((item: any) => ({
                            neighbor: item.neighbor,
                            port: item.port,
                            remotePort: item.remotePort,
                            status: 'Ok',
                            createdAt: horaAtual,
                        }))
                    }
                }
            })

            return 'Host Registrado'
        } catch(erro) {
            return `Erro ao registrar Host \n Erro: ${erro} `
        }
        
    })


    /* Types */
    type bc = {
        hostname: string,
        HostQueries: {
            neighbor: string,
            port: string,
            remotePort: string,
            status: string,
            createdAt: Date, 
            id: string,
            hostId: string
        }[],
    }

    type Consulta = {
        hostname: string,
        neighbor: string,
        ip: string,
        port: string,
        remotePort: string,
        status: string,
        createdAt: string
    }

    type vefConsulta = {
        neighbor: string
        port: string,
        remotePort: string,
        createdAt: Date
    }

}


