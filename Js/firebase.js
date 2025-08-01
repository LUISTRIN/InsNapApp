import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {getAuth} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import {getFirestore} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
import {firebaseConfig} from "./firebaseConfig.js"

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db}