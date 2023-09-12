import Fastify from 'fastify'
import cors from '@fastify/cors'
import { appRoutes } from './routes'
import dotenv from 'dotenv';

dotenv.config()

const app = Fastify()

app.register(cors)
app.register(appRoutes)

const porta = process.env.BACKEND_PORT;


app.listen({
    port: 3333, 
    host: '0.0.0.0'
}).then((address) => {
    console.log(`Server running on ${address} \n`, porta)
}).catch( err => {
    console.log('Erro starting server: ', err, )
    process.exit(1)
})