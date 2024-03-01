import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/config/firebase-config";
import { orderSchema } from "../models/models";
import { z } from "zod";

const takeoutOrderCollection = collection(db, 'takeoutOrder')
const tableOrderCollection = collection(db, 'orderOnTheTable')
type orderParams = z.infer<typeof orderSchema>

const getTakeoutOrders = async () => {
  const data = await getDocs(takeoutOrderCollection)
  const list = data.docs.map((doc) => ({ ...doc.data() }))
  return list
}

const getTableOrder = async () => {
  const data = await getDocs(tableOrderCollection)
  const list = data.docs.map((doc) => ({ ...doc.data() }))
  return list
}

const wasPaidTakeout = async (id: string) => {
  const q = query(takeoutOrderCollection, where("id", "==", id))
  const querySnapshot = await getDocs(q)

  if (querySnapshot.size === 0) {
    return false
  }

  const idRef = querySnapshot.docs[0].id
  const docRef = doc(db, 'takeoutOrder', idRef)
  await deleteDoc(docRef)
  return true
}

const wasPaidTable = async (id: string) => {
  const q = query(tableOrderCollection, where("id", "==", id))
  const querySnapshot = await getDocs(q)

  if (querySnapshot.size === 0) {
    return false
  }

  const idRef = querySnapshot.docs[0].id
  const docRef = doc(db, 'orderOnTheTable', idRef)
  await deleteDoc(docRef)
  return true
}

export {getTakeoutOrders, getTableOrder, wasPaidTakeout, wasPaidTable}