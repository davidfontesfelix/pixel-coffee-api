import express from 'express'
import { getAllCoffees } from '../controllers/menu-controllers'

const routes = express.Router()

routes.get('/menu/coffees', async (req, res) => {
  const response = await getAllCoffees()

  res.status(200).json(response)
})

export {routes}