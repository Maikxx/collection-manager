import * as express from 'express'
import * as helmet from 'helmet'
import { ApolloServer } from 'apollo-server-express'
import { createSchema } from './api/schema'
import { spawn } from 'child_process'
import { connectToDatabase } from './db/db'

if (process.env.NODE !== 'production') {
    require('dotenv').config()
}

(async() => {
    await connectToDatabase()

    const app = express()
    app.use(helmet())

    const server = new ApolloServer({ schema: createSchema() })
    server.applyMiddleware({ app })

    app.listen(({ port: 5000 }), () => {
        console.info(`GraphQL is now running on http://localhost:5000${server.graphqlPath}`)
    })

    if (process.env.NODE !== 'production') {
        app.on('sigterm', () => {
            spawn('sh', ['./db/stop_db.sh'])
        })
    }
})()
