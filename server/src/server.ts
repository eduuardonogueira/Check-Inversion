import Fastify from 'fastify'
import cors from '@fastify/cors'
import { appRoutes } from './routes'

const app = Fastify()

app.register(cors)
app.register(appRoutes)


app.listen({
    port: 3333, 
}).then((address) => {
    console.log(`Server running on ${address} \n`)
}).catch( err => {
    console.log('Erro starting server: ', err)
    process.exit(1)
})