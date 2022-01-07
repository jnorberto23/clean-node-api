import express from 'express'
import setupMiddlewares from './middlewares'
import setupRoutes from './routes'

import SetupApolloServer from './apollo-server'

const app = express()
SetupApolloServer(app)
setupMiddlewares(app)
setupRoutes(app)
export default app
