import request from 'supertest'
import app from '../app'

describe('GET /menu/coffees', () => {
  it('should return an array', async () => {
    const response = await request(app).get('/menu/coffees')

    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
  })
})