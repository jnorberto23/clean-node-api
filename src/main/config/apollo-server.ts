import { ApolloServer } from 'apollo-server-express'
import resolvers from '../graphql/resolvers'
import typeDefs from '../graphql/typeDefs'
import { authDirectiveTransformer } from '../graphql/diretives'
import { makeExecutableSchema } from 'graphql-tools'

let schema = makeExecutableSchema({ resolvers, typeDefs })
schema = authDirectiveTransformer(schema)

export const setupApolloServer = (): ApolloServer => new ApolloServer({
  schema,
  context: ({ req }) => ({ req })
})
