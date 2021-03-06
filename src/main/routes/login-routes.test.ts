import { Collection } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helpers'

import { hash } from 'bcrypt'
import { Express } from 'express'

let app: Express

let accountCollection: Collection

describe('Login Routes Middleware', () => {
  app.get('/test_content_type', (req, res) => {
    res.send('')
  })
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })
  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
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
  describe('Post /login', () => {
    test('should return 200 on login', async () => {
      const password = await hash('123', 12)
      await accountCollection.insertOne({
        name: 'João Norberto',
        email: 'joao@email.com',
        password
      })
      await request(app)
        .post('/api/login')
        .send({
          email: 'joao@email.com',
          password: '123'
        })
        .expect(200)
    })
    test('should return 401 on login', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: 'joao@email.com',
          password: '123'
        })
        .expect(401)
    })
  })
})
