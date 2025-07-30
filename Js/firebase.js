import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getAuth
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import {
  getFirestore
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBzi3aS-mUP9u7XRw0d7JDIYZE8EhMzXcE",
    authDomain: "insnap-b416a.firebaseapp.com",
    projectId: "insnap-b416a",
    storageBucket: "insnap-b416a.appspot.com",
    messagingSenderId: "146360024444",
    appId: "1:146360024444:web:a1d2109e4d920b3f3738f9",
    measurementId: "G-XEL6P6QBLY"
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db}