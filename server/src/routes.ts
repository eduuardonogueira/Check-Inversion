import { PrismaClient } from "@prisma/client"
import { FastifyInstance } from "fastify"
import { z } from 'zod'
import consultHost  from "../scripts/consult-host.js"
import dayjs from "dayjs"

const prisma = new PrismaClient()

export async function appRoutes(app: FastifyInstance) {

    app.post('/consult', async (request) => {

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
        
        for (let i = 0; i < consulta.length; i ++){
            await prisma.consult.create({
                data: {
                    ipTarget: consulta[i].ip,
                    hostname: consulta[i].hostname,
                    neighbor: consulta[i].neighbor,
                    port: consulta[i].port,
                    remotePort: consulta[i].remotePort,
                    created_at: today
                }
            })
        }

        return consulta
    })

    app.get('/consult', async (request) => {

        await prisma.consult.findMany(
            
        )




    })

}


