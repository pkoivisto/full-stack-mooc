const mongoose = require('mongoose')
const User = require('../models/user')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

beforeEach(async () => {
  await User.remove({})
})

describe('creating a user', () => {
  test('results in one added user if required data is provided',async () => {
    const { username, name, password } = { username: 'testi', name: 'Teemu Testaaja', password: 'salasana' }
    const savedData = await api.post('/api/users').send( { username, name, password })
    expect(savedData.body).toEqual(expect.objectContaining({ username, name }))
  })

  test('fails if username is not unique', async () => {
    const username = 'testUser'
    const firstResult = await api.post('/api/users').send( { username, name : 'User Name', password : 'password'})
    expect(firstResult.status).toBe(200)

    const secondResult = await api.post('/api/users').send( { username, name : 'Another User', password : 'password123' })
    expect(secondResult.status).toBe(400)
    expect(secondResult.body.error).toContain('username: value for field must be unique')
  })

  test('fails if password is not provided or is not long enough', async () => {
    const expectPasswordError = (response) => {
      expect(response.status).toBe(400)
      expect(response.body.error).toEqual('Password missing or too short')
    }

    const {username, name} = { username : 'testUser', name : 'User Name'}

    const missingPassword = await api.post('/api/users').send({username, name})
    expectPasswordError(missingPassword)

    const passwordTooShort = await api.post('/api/users').send({username, name, password : '1!'})
    expectPasswordError(passwordTooShort)
  })
})

afterAll(() => {
  mongoose.connection.close()
})