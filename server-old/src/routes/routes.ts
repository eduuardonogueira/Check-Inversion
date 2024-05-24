import { FastifyInstance } from 'fastify'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import dayjs from 'dayjs';

import { authenticate } from 'ldap-authentication'
import { createSigner } from 'fast-jwt'
import { AuthService } from '../controllers/user.controllers.js';

import consultHost  from '../../scripts/consult-host.js'
import { checkQuery } from '../core/checkQuery.core.js';

import { monitoring } from '../core/monitoring.core.js';

//const createToken = createSigner({ key: process.env.JWT_SECRET })
//const verifyToken = createSigner({ key: (callback: any) => callback(null, process.env.JWT_SECRET)})

const prisma = new PrismaClient()

export const routes = async (app: FastifyInstance) => {

    //monitoring()

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
        const allHosts = []

        for(const host of hosts) {
            const neighborsCount = await prisma.neighbor.count({
                where: {
                    hostId: host.id
                }
            })

            const NeighborQueries = await prisma.neighborQuery.findMany({
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

            allHosts.push({hostname: host.hostname, NeighborQueries: NeighborQueries})
            checkQuery(allHosts)
        }

        return allHosts
    })

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

            const NeighborQueries = await prisma.neighborQuery.findMany({
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

            NeighborQueries.length == 0 ? '' : invertidos.push({hostname: host.hostname, NeighborQueries: NeighborQueries})
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

            const NeighborQueries = await prisma.neighborQuery.findMany({
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

            checkOk.push({hostname: host.hostname, NeighborQueries: NeighborQueries})
            checkQuery(checkOk)
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

    app.post('/validate', async (req) => {
        const createDataBody = z.object({
            token: z.string()
        })

        const { token } = createDataBody.parse(req.body)

        // verificar o token
        //console.log(`Token do FRONTEND: ${token}`)

        // se existe:
        if ( token == process.env.JWT_SECRET ){


            console.log("passou")
            return({

                user: {
                    id: 3,
                    name: 'teste',
                    email: 'teste'
                }
            })
        }

        // senão :
        console.log('token inválido')
        return('token inválido')
    })

    app.post('/signin', async (req, reply) => {
        const createDataBody = z.object({
            username: z.string(),
            password: z.string(),
        })

        const { username, password } = createDataBody.parse(req.body)

        const user = await AuthService(username, password)

        if (!user) {
            return reply.send({
                status: 404,
                data: "User Not Found"
            })
        } else {
            const token = process.env.JWT_SECRET //createToken({ payload: "teste" })

            return reply.send({
                status: 500,
                user: {
                    id: user.uidNumber,
                    name: user.cn,
                    email: user.mail
                },
                token: token
            })
        }
    })

    app.post('/logout', async () => (true))

    // TODO: change the request information in inversion page
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
                        hostname: name
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
                            hostname: item.neighbor,
                            port: item.port,
                            remotePort: item.remotePort,
                            createdAt: horaAtual,
                            updatedAt: horaAtual
                        }))
                    },
                    neighborsQueries: {
                        create: neighbors.map((item: any) => ({
                            hostname: item.neighbor,
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
            //return `Erro ao registrar Host \n Erro: ${erro} `
            console.log(erro)
            return "Erro ao registrar o Host \n Por favor, tente contato com o Administrador da aplicação"
        }

    })


    /* Types */

}
