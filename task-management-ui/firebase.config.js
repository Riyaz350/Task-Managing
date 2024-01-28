// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyDU3gi4xB_zUO3nldne_A3j7Jbs_Me0uVs",
  authDomain: "task-managing.firebaseapp.com",
  projectId: "task-managing",
  storageBucket: "task-managing.appspot.com",
  messagingSenderId: "444936920266",
  appId: "1:444936920266:web:fbf973967fa12f47cda833",
  measurementId: "G-3DX30CD0XN"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
export const db = getFirestore()
export default auth;