import { z } from "zod"

const itemArray = z.object({
  name: z.string(),
  quantity: z.number(),
  id: z.number(),
  price: z.number()
})

const orderSchema = z.object({
  id: z.string(),
  order: z.array(itemArray),
  table: z.string().optional()
})


export {orderSchema}