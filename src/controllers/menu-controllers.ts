import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config/firebase-config";

const coffeeCollection = collection(db, 'category')

const getAllCoffees = async () => {
  const data = await getDocs(coffeeCollection)
  const list = data.docs.map((doc) => ({...doc.data()}))
  return list
}

export {getAllCoffees}