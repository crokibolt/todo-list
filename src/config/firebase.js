// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcMpx1rPRn5_qR1KuwaV8JxY8KblpRztI",
  authDomain: "todo-app-b2df1.firebaseapp.com",
  projectId: "todo-app-b2df1",
  storageBucket: "todo-app-b2df1.appspot.com",
  messagingSenderId: "980353883098",
  appId: "1:980353883098:web:e71001420009f7b2107ee3",
  measurementId: "G-PHD6M3GB4W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);