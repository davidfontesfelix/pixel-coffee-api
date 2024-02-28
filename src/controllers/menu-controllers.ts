import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config/firebase-config";
import { z } from "zod";
import { orderSchema } from "../models/models";

const coffeeCollection = collection(db, 'category')
const takeoutOrderCollection = collection(db, 'takeoutOrder')
const tableOrderCollection = collection(db, 'orderOnTheTable')
type orderParams = z.infer<typeof orderSchema>

const getAllCoffees = async () => {
  const data = await getDocs(coffeeCollection)
  const list = data.docs.map((doc) => ({...doc.data()}))
  return list
}
const getTicket = async () => {
  const data = await getDocs(takeoutOrderCollection)
  return data.size
}

const postTakeoutOrder = async (order: orderParams) => {
  await addDoc(takeoutOrderCollection, order)
}

const postTableOrder = async (order: orderParams) => {
  await addDoc(tableOrderCollection, order)
} 

 
export {getAllCoffees, getTicket, postTakeoutOrder, postTableOrder}