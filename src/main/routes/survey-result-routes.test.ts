import request from 'supertest'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helpers'
import app from '../config/app'

describe('Survey Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('Put /surveys/:surveyId/results', () => {
    test('Should return 403 on add survey without accessToken', async () => {
      await request(app)
        .put('/api/surveys/any_token/results')
        .send({
          answer: 'any_answer'
        })
        .expect(403)
    })
  })
})
