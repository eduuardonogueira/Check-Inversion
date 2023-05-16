import { PrismaClient } from "@prisma/client"
import { FastifyInstance } from "fastify"
import { z } from 'zod'
import consultHost  from "../scripts/consult-host.js"
import dayjs from "dayjs"

const prisma = new PrismaClient()

export async function appRoutes(app: FastifyInstance) {

    app.get('/', async (request) => {
        return "olá mundo"
    } )

    app.post('/consultar', async (request) => {

        const createIpBody = z.object({
            ip: z.string()
        })

        const { ip } = createIpBody.parse(request.body)

        async function chamaFunção() {
            const resultado = await consultHost(ip)
            return resultado
        }
    
        const consulta = await chamaFunção()

        const today = dayjs().startOf('day').toDate()

        return consulta
    })

    app.post('/login', async (request) => {

        const createLoginBody = z.object({
            usuario: z.string(),
            senha: z.any()
        })

        const { usuario, senha } = createLoginBody.parse(request.body)

        return (usuario + senha)

        await prisma.consult.findMany(
            
        )

    })

}


