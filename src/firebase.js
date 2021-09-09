import { initializeApp } from "firebase/app"
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDqig31FrLQufK88S5wx5aEmk_qxvzyukI",
  authDomain: "agenda-jallcard-react-6e876.firebaseapp.com",
  projectId: "agenda-jallcard-react-6e876",
  storageBucket: "agenda-jallcard-react-6e876.appspot.com",
  messagingSenderId: "745126495243",
  appId: "1:745126495243:web:fe6fb932c0d64bd83af30e",
  measurementId: "G-LPNQE7WX5K"
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {
  auth, provider, signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
}
export default app