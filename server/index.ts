import * as express from 'express'
import * as helmet from 'helmet'
import { ApolloServer } from 'apollo-server-express'
import { createSchema } from './api/schema'
import { connectToMongoAtlas } from './db/connect'

if (process.env.NODE !== 'production') {
    require('dotenv').load()
}

connectToMongoAtlas()

const app = express()
app.use(helmet())

const server = new ApolloServer({ schema: createSchema() })
server.applyMiddleware({ app })

app.listen(({ port: 5000 }), () => {
    console.info(`GraphQL is now running on http://localhost:5000${server.graphqlPath}`)
})
