import request from 'supertest'
import { Express } from 'express'
import { setupApp } from '../config/app'

let app: Express

describe('Cors Middleware', () => {
  beforeAll(async () => {
    app = await setupApp()
  })

  test('Should enable Cors', async () => {
    app.post('/test_cors', (req, res) => {
      res.send()
    })
    await request(app)
      .post('/test_cors')
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-headers', '*')
      .expect('access-control-allow-methods', '*')
  })
})
