import Fastify from 'fastify'
import { routes } from './routes/routes'
import cors from '@fastify/cors'
import dotenv from 'dotenv';
dotenv.config()

const app = Fastify()

app.register(cors)
app.register(routes, {prefix: '/api'})

const port = parseInt( !process.env.BACKEND_PORT ? '' : process.env.BACKEND_PORT )
const host = process.env.BACKEND_HOST

app.listen({
    port: port, 
    host: host
}).then((address) => {
    console.log(`Server running on ${address}`)
}).catch( err => {
    console.log('Erro starting server: ', err, )
    process.exit(1)
})