import Fastify from 'fastify'
import cors from '@fastify/cors'
import { appRoutes } from './routes'
import dotenv from 'dotenv';
dotenv.config()

const app = Fastify()

app.register(cors)
app.register(appRoutes)

const portString: string | undefined = process.env.BACKEND_PORT 
const port = parseInt(portString == undefined ? '': portString )

const host = process.env.BACKEND_HOST

app.listen({
    port: port, 
    host: host
}).then((address) => {
    console.log(`Server running on ${address}`,)
}).catch( err => {
    console.log('Erro starting server: ', err, )
    process.exit(1)
})