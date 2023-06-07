import { PrismaClient } from '@prisma/client'
import { FastifyInstance } from 'fastify'
import { date, z } from 'zod'
import consultHost  from '../scripts/consult-host.js'
import dayjs, { Dayjs } from 'dayjs';

const prisma = new PrismaClient()

export async function appRoutes(app: FastifyInstance) {
    const hour = dayjs().toDate()
    async function monitorar(){
        function vef( value1:vefConsulta, value2: Consulta){
            if (value1.neighbor !== value2.neighbor) {
                return 'Invertido'
            }
            if (value1.port !== value2.port) {
                return 'Invertido'
            }
            if (value1.remotePort !== value2.remotePort) {
                return 'Invertido'
            }

            return 'Ok'
        }

        const dados = await prisma.host.findMany({
            include: {
                neighbors: true,
            }
        })

        var contador = 0

        async function query() {
            const hour = dayjs().format('YYYY-MM-DDTHH:mm:ss.SSS'+'[Z]')
            console.log(contador)
            const hostQuery: Consulta[] = await consultHost(dados[contador].ip)
            console.log(dados[contador].hostname)
            
            var vizinhos = 0 
            function registrar() {
                if ( vizinhos < hostQuery.length ) {
                    setTimeout( async () => {
                        await prisma.hostQuery.create({
                            data: {
                                host: { connect: { id: dados[contador].id } },
                                neighbor: hostQuery[vizinhos].neighbor,
                                port: hostQuery[vizinhos].port,
                                remotePort: hostQuery[vizinhos].remotePort,
                                status: vef(dados[contador].neighbors[vizinhos], hostQuery[vizinhos]) == 'Invertido' ? 'Invertido' : 'Ok' ,
                                createdAt: hour
                            }
                        })

                        console.log('registrado: ' + hostQuery[vizinhos].neighbor + " | horário: " + hour )
                        vizinhos ++
                        setImmediate(registrar)
                    }, 500 )
                }
            }

            registrar()
            
            setTimeout(() => {
                if ( contador < dados.length - 1) {
                    console.log('Consultando próximo')
                    contador ++
                    setImmediate(query)
                }
            }, 5000)
        }
            
        query()

        setTimeout(monitorar, 5 * 60 * 1000)
    }
    monitorar()


    /* Rotas */

    /* Visão Geral */

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

    app.get('/todos', async (req, res) => {
        const hour = dayjs().format('YYYY-MM-DDTHH:mm:ss.SSS'+'[Z]')
        const lastFive = dayjs().subtract(5, 'minutes').format('YYYY-MM-DDTHH:mm:ss.SSS'+'[Z]')

        const todos = await prisma.host.findMany({
            include: {
                HostQueries: {
                    where: {
                        createdAt: {
                            gte: lastFive,
                            lte: hour
                        }
                    },
                    orderBy: {
                        createdAt: 'asc'
                    }
                }
            }
        })

        vefConsulta(todos)
        
        return todos
    });

    app.get('/invertidos', async (req, res) => {
        const hour = dayjs().format('YYYY-MM-DDTHH:mm:ss.SSS'+'[Z]')
        const lastFive = dayjs().subtract(5, 'minutes').format('YYYY-MM-DDTHH:mm:ss.SSS'+'[Z]')

        const invertidos = await prisma.host.findMany({
            select: {
                hostname: true,
                HostQueries: {
                    where: {
                        status: 'Invertido',
                        createdAt: {
                            gte: lastFive,
                            lte: hour
                        },
                    },
                    orderBy: {
                        createdAt: 'asc'
                    }
                }
            }
        })

        return invertidos
    })

    app.get('/check-ok', async (req, res) => {
        const hour = dayjs().format('YYYY-MM-DDTHH:mm:ss.SSS'+'[Z]')
        const lastFive = dayjs().subtract(5, 'minutes').format('YYYY-MM-DDTHH:mm:ss.SSS'+'[Z]')

        const checkOk = await prisma.host.findMany({
            include: {
                HostQueries: {
                    where: {
                        status: 'Ok',
                        createdAt: {
                            gte: lastFive,
                            lte: hour
                        }
                    },
                    orderBy: {
                        createdAt: 'asc'
                    }
                }
            }
        })

        vefConsulta(checkOk)

        return checkOk

    })


    /* Consulta */
    app.post('/consultar', async (req) => {

        const createIpBody = z.object({
            ip: z.string()
        })

        const { ip } = createIpBody.parse(req.body)

        const consulta = await consultHost(ip)

        return consulta
    })

    app.post('/consultar/informacoes', async (req) => {
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





    type Consulta = {
        hostname: string,
        neighbor: string
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


