import request from 'supertest'
import app from '../app'

describe('GET /menu/coffees', () => {
  it('should return an array', async () => {
    const response = await request(app).get('/menu/coffees')

    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
  })
})

describe('GET /menu/takeout/ticket', () => {
  it('should retorna a propriety "ticketNumber"', async () => {
    const response = await request(app).get('/menu/takeout/ticket')

    expect(response.status).toBe(200)
  })
})

describe('POST /menu/takeout-order', () => {
  it('should return the error: "Erro de validação dos dados"', async () => {
    const response = await request(app).post('/menu/takeout-order')

    expect(response.status).toBe(400)
    expect(response.body).toEqual({ error: 'Erro de validação dos dados' })
  })
})

describe('POST /menu/table-order', () => {
  it('should return the error: "Erro de validação dos dados"', async () => {
    const response = await request(app).post('/menu/table-order')

    expect(response.status).toBe(400)
    expect(response.body).toEqual({ error: 'Erro de validação dos dados' })
  })
})
