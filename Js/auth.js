import { auth } from "./firebase.js"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js"

const registerForm = document.getElementById("register-form")
const loginForm = document.getElementById("login-form")
const logoutBtn = document.getElementById("logout")

if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    const name = document.getElementById("name").value.trim()
    const email = document.getElementById("email").value.trim()
    const password = document.getElementById("password").value
    const confirmPassword = document.getElementById("confirmPassword").value
    const errorEL = document.getElementById("register-error")

    errorEL.textContent = ""

    if (password !== confirmPassword) {
      errorEL.textContent = "As senhas não são iguais"
      return
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(userCredential.user, { displayName: name })
      window.location.href = "index.html"
    } catch (err) {
      errorEL.textContent = err.message
    }
  })
}

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    const email = document.getElementById("email").value.trim()
    const password = document.getElementById("password").value
    const errorEl = document.getElementById("login-error")

    try {
      await signInWithEmailAndPassword(auth, email, password)
      window.location.href = "index.html"
    } catch (err) {
      errorEl.textContent = err.message
    }
  })
}

if (logoutBtn) {
  logoutBtn.style.display = "none"

  onAuthStateChanged(auth, (user) => {
    if (user) {
      logoutBtn.style.display = "inline-block"
    } else {
      logoutBtn.style.display = "none"
    }
  })

  logoutBtn.addEventListener("click", async () => {
    await signOut(auth)
    window.location.href = "login.html"
  })
}

onAuthStateChanged(auth, (user) => {
  const authLinks = document.querySelectorAll(".auth-only")
  const guestLinks = document.querySelectorAll(".guest-only")
  const logoutBtn = document.getElementById("logout")

  if(user) {
    authLinks.forEach(el => el.style.display = "inline-block")
    guestLinks.forEach(el => el.style.display = "none")
    if (logoutBtn) logoutBtn.style.display = "inline-block"
  }else {
    authLinks.forEach(el => el.style.display = "none")
    guestLinks.forEach(el => el.style.display = "inline-block")
    if(logoutBtn) logoutBtn.style.display = "none"
  }
})