import { badRequest, notFound, serverError, unauthorized } from './components'
import { loginPath } from './paths'
import { accountSchema, ErrorSchema, loginParamsSchema } from './schemas'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Clean Node API',
    description: 'API do curso do Manguinho para realizar enquetes entre programadores',
    version: '1.0.0'
  },
  license: {
    name: 'ISC',
    url: 'https://opensource.org/licenses/ISC'
  },
  servers: [{
    url: '/api'
  }],
  tags: [{
    name: 'Login'
  }],
  paths: {
    '/login': loginPath
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
    error: ErrorSchema
  },
  components: {
    badRequest,
    serverError,
    unauthorized,
    notFound
  }
}
