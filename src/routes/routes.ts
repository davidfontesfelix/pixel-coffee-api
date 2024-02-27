import express from 'express'
import { getAllCoffees, postTableOrder, postTakeoutOrder } from '../controllers/menu-controllers'
import { ZodError, z } from 'zod'

const routes = express.Router()

const itemArray = z.object({
  name: z.string(),
  quantity: z.number(),
  id: z.number(),
  price: z.number()
})

const orderSchema = z.object({
  order: z.array(itemArray),
  table: z.string().optional()
})

routes.get('/menu/coffees', async (req, res) => {
  const response = await getAllCoffees()

  res.status(200).json(response)
})

routes.post('/menu/takeout-order', async (req, res) => {
  try {
    const { order } = orderSchema.parse(req.body)

    const data = {
      order
    }

    const response = await postTakeoutOrder(data)

    res.status(201).json({ message: 'O numero do seu pedido é:', number: response })

  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ error: 'Erro de validação dos dados' })
    } else {
      res.status(503).json({ error: 'O servidor não conseguiu receber os dados' })
    }
  }
})

routes.post('/menu/table-order', async (req, res) => {
  try {
    const { order } = orderSchema.parse(req.body)

    const data = {
      order
    }
  
    await postTableOrder(data)

    return res.status(201).json({ message: 'Logo logo entregaremos o pedido a sua mesa'})
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ error: 'Erro de validação dos dados' })
    } else {
      res.status(503).json({ error: 'O servidor não conseguiu receber os dados' })
    }
  }

})

export {routes}