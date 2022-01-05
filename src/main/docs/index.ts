import { badRequest, forbidden, notFound, serverError, unauthorized } from './components'
import { loginPath, signupPath, surveyPath } from './paths'
import { accountSchema, addSurveyParamsSchema, apiKeyAuthSchema, ErrorSchema, loginParamsSchema, signupParamsSchema, surveyAnswerSchema, surveySchema, surveysSchema } from './schemas'

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
    '/login': loginPath,
    '/signup': signupPath,
    '/surveys': surveyPath
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
    signupParams: signupParamsSchema,
    error: ErrorSchema,
    surveys: surveysSchema,
    survey: surveySchema,
    surveyAnswer: surveyAnswerSchema,
    addSurveyParams: addSurveyParamsSchema
  },
  components: {
    securitySchemes: {
      apiKeyAuth: apiKeyAuthSchema
    },
    badRequest,
    serverError,
    unauthorized,
    notFound,
    forbidden
  }
}
