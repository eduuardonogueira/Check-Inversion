import { PrismaClient } from '@prisma/client'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import consultHost  from '../scripts/consult-host.js'
import dayjs from 'dayjs';

const prisma = new PrismaClient()

export async function appRoutes(app: FastifyInstance) {
    async function monitorar(){

        const dados = await prisma.host.findMany({
            include: {
                neighbors: true,
            }
        })

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

        var contador = 0

        async function query() {
            const horaAtual = dayjs().format('YYYY-MM-DDTHH:mm:ss.SSS'+'[Z]')
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
                                createdAt: horaAtual
                            }
                        })

                        console.log('registrado: ' + hostQuery[vizinhos].neighbor + " | horário: " + horaAtual )
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

    app.get('/', async (req, res) => {
        const horaAtual = dayjs().format('YYYY-MM-DDTHH:mm:ss.SSS'+'[Z]')
        const ultimosCincoMinutos = dayjs().subtract(5, 'minutes').format('YYYY-MM-DDTHH:mm:ss.SSS'+'[Z]')

        const todos = await prisma.host.findMany({
            include: {
                HostQueries: {
                    where: {
                        createdAt: {
                            gte: ultimosCincoMinutos,
                            lte: horaAtual
                        }
                    },
                    orderBy: {
                        createdAt: 'asc'
                    }
                }
            }
        })

        return todos

    });

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


