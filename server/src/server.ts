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

app.listen({
    port: port, 
    host: '0.0.0.0'
}).then((address) => {
    console.log(`Server running on ${address}`,)
}).catch( err => {
    console.log('Erro starting server: ', err, )
    process.exit(1)
})