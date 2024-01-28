// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDU3gi4xB_zUO3nldne_A3j7Jbs_Me0uVs",
  authDomain: "task-managing.firebaseapp.com",
  projectId: "task-managing",
  storageBucket: "task-managing.appspot.com",
  messagingSenderId: "444936920266",
  appId: "1:444936920266:web:fbf973967fa12f47cda833"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;