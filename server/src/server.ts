import Fastify from 'fastify'
import cors from '@fastify/cors'
import { appRoutes } from './routes'

const app = Fastify()

app.register(cors)
app.register(appRoutes)


app.listen({
    port: 3333,
    host: "200.129.132.211"
}).then(() => {
    console.log(`Server running on http://200.129.132.211:${3333}`)
})