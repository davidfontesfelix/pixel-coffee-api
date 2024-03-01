import express from "express"
import { getTableOrder, getTakeoutOrders, wasPaidTable, wasPaidTakeout } from "../controllers/sales-controllers"
import { ZodError, z } from "zod"
const salesControlRoutes = express.Router()

salesControlRoutes.get('/sales-control/takeout/orders', async (req, res) => {
  try {
    const response = await getTakeoutOrders()

    res.status(200).json(response)
  } catch {
    res.status(500).json({error: 'O servidor não conseguiu mandar os dados'})
  }
})

salesControlRoutes.get('/sales-control/table/orders', async (req, res) => {
  try {
    const response = await getTableOrder()

    res.status(200).json(response)
  } catch {
    res.status(500).json({error: 'O servidor não conseguiu mandar os dados'})
  }
})

salesControlRoutes.delete('/takeout/was-paid/:id', async (req, res) => {
  try { 
    const id = req.params.id
    const response = await wasPaidTakeout(id)

    if (response){
      res.status(200).json({message: 'Pedido pago'})
    } else {
      res.status(404).json({error: 'Id não encontrado'})
    }
    
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ error: 'Erro de validação dos dados' })
    } else {
      res.status(503).json({ error: 'O servidor não conseguiu receber os dados' })
    }
  }
}) 
salesControlRoutes.delete('/table/was-paid/:id', async (req, res) => {
  try { 
    const id = req.params.id
    const response = await wasPaidTable(id)

    if (response){
      res.status(200).json({message: 'Pedido pago'})
    } else {
      res.status(404).json({error: 'Id não encontrado'})
    }
    
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ error: 'Erro de validação dos dados' })
    } else {
      res.status(503).json({ error: 'O servidor não conseguiu receber os dados' })
    }
  }
}) 

export {salesControlRoutes}