import express from 'express'
import { getAllCoffees, getTicket, postTableOrder, postTakeoutOrder } from '../controllers/menu-controllers'
import { ZodError, z } from 'zod'
import {v4 as uuidv4} from 'uuid'

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
  try {
    const response = await getAllCoffees()
  
    res.status(200).json(response)
  } catch {
    res.status(500).json({error: 'O servidor não conseguiu mandar os dados'})
  }
})

routes.get('/menu/takeout/ticket', async (req, res) => {
  try {
    const response = await getTicket()
  
    res.status(200).json({ ticketNumber: response })
  } catch {
    res.status(500).json({error: 'O servidor não conseguiu mandar os dados'})
  }
})

routes.post('/menu/takeout-order', async (req, res) => {
  try {
    const { order } = orderSchema.parse(req.body)

    const data = {
      order,
      id: uuidv4()
    }

    await postTakeoutOrder(data)

    res.status(201).json({ message: 'Pedido feito'})

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
    const { order, table } = orderSchema.parse(req.body)

    const data = {
      order,
      table,
      id: uuidv4()
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