import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helpers'
import app from '../config/app'

describe('Login Routes Middleware', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })
  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection('account')
    await accountCollection.deleteMany({})
  })
  describe('Post /signup', () => {
    test('Should return 200 on signup', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'João Norberto',
          email: 'joao@email.com',
          password: '123',
          passwordConfirmation: '123'
        })
        .expect(200)
    })
  })
})
