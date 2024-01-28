import { collection } from "firebase/firestore";
import { db } from "../../../../firebase.config";

export const tasks = collection(db, 'tasks')