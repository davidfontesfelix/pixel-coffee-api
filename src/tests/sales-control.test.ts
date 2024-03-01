import request from 'supertest'
import app from '../app'

describe("GET /sales-control/takeout/orders", () => {
  it("should return an array", async () => {
    const response = await request(app).get("/sales-control/takeout/orders")

    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
  })
})

describe("GET /sales-control/table/orders", () => {
  it("should return an array", async () => {
    const response = await request(app).get("/sales-control/table/orders")

    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
  })
})

describe("DELETE /takeout/was-paid/:id", () => {
  it("should return the error: 'Id não encontrado'", async () => {
    const response = await request(app).delete('/takeout/was-paid/idinvalido')

    expect(response.status).toBe(404)
    expect(response.body).toEqual({
      "error": "Id não encontrado"
    })
  })
})

describe("DELETE /table/was-paid/:id", () => {
  it("sould return the error: 'Id não encontrado'", async () => {
    const response = await request(app).delete('/table/was-paid/idinvalido')

    expect(response.status).toBe(404)
    expect(response.body).toEqual({
      "error": "Id não encontrado"
    })
  })
})