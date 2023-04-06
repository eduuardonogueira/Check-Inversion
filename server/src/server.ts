import Fastify from 'fastify'
import cors from '@fastify/cors'
import { PrismaClient } from "@prisma/client"
import consultHost  from "../scripts/consult-host.js"
import dayjs from "dayjs"

const app = Fastify()
const prisma = new PrismaClient()

app.register(cors)

app.get('/', async (req, reply) => {

    async function chamaFunção() {
        const resultado = await consultHost('172.16.8.1')
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
    
})



app.listen({
    port: 3333,
}).then(() => {
    console.log(`Server running on port ${3333}`)
})