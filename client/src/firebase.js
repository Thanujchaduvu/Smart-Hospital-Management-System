import { initializeApp } from "firebase/app"

import {
  getAuth,
  GoogleAuthProvider
} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDfmVY3qQlsNph9AAfJTN_wg_6kEXmXqQs",
  authDomain: "web-app-f9d55.firebaseapp.com",
  projectId: "web-app-f9d55",
  storageBucket: "web-app-f9d55.firebasestorage.app",
  messagingSenderId: "689957634050",
  appId: "1:689957634050:web:25a0e484f99b2c8f36a71b",
  measurementId: "G-1GNP6BT1GC"
};


const app = initializeApp(firebaseConfig)

const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export {
  auth,
  provider
}