import { PrismaClient } from "@prisma/client"
import { FastifyInstance, FastifyRequest } from "fastify"
import { z } from 'zod'
import consultHost  from "../scripts/consult-host.js"
import dayjs from "dayjs"

const prisma = new PrismaClient()

export async function appRoutes(app: FastifyInstance) {

    app.get('/', async (req, res) => {
        const hosts = await prisma.host.findMany({
            include: {
                neighbors: true
            }
        })

        return hosts
    })


    app.post('/consultar', async (req) => {

        const createIpBody = z.object({
            ip: z.string()
        })

        const { ip } = createIpBody.parse(req.body)

        const consulta = await chamaFuncao(ip)

        const today = dayjs().startOf('day').toDate()

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

        const neighbor = await prisma.neighbor.findFirst({ where: { neighbor: name } })

        return host
    })

    app.post('/registrar', async (req) => {
        const createRegistro = z.object({
            ip: z.string(),
        })

        const { ip } = createRegistro.parse(req.body)
        const neighbors = await chamaFuncao( ip )

        try {
            await prisma.host.create({
                data: {
                    ip: ip,
                    hostname: neighbors[0].hostname,
                    neighbors: { 
                        create: neighbors.map((item: any) => ({
                            neighbor: item.neighbor,
                            port: item.port,
                            remotePort: item.remotePort
                        }))
                     }
                }
            })

            return 'Host Registrado'
        } catch(erro) {
            return `Erro ao registrar Host \n Erro: ${erro} `
        }
        
    })

}

async function chamaFuncao(ip: string) {
    const resultado = await consultHost(ip)
    return resultado
}

