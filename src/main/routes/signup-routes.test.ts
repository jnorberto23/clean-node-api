import request from 'supertest'
import app from '../config/app'

describe('SignUp Routes Middleware', () => {
  test('Should return an account on success', async () => {
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
