import { db, auth} from "./firebaseConfig.js"
import {addDoc, collection, Timestamp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js"
import {onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js"

document.addEventListener("DOMContentLoaded", () => {
    /** @type {HTMLFormElement | null} */
    const form = document.getElementById("create-post")
    /** @type {HTMLFormElement | null} */
    const errorEl = document.getElementById("create-err")

    onAuthStateChanged(auth, (user) => {
        if(!user) {
            window.location.href = "login.html"
            return
        }

        form.addEventListener("submit", async (e) => {
            e.preventDefault()
            errorEl.textContent = ""

            const title = document.getElementById("title").value.trim()
            const image = document.getElementById("image").value.trim()
            const body = document.getElementById("body").value.trim()
            const tags = document.getElementById("tags").value.trim()

            if(!title || !image || !body) {
                errorEl.textContent = "Todos os campos precisam estar preenchidos"
                return
            }

            let tagsArray = []
            if(tags) {
                tagsArray = tags.split(",").map(tag => tag.trim().toLowerCase())
            }

            try {
                const post = {
                    title,
                    image,
                    body,
                    tagsArray,
                    createdAt: Timestamp.now(),
                    uid: user.uid,
                    createdBy: user.displayName || user.email
                };

                await addDoc(collection(db, "posts"), post)
                window.location.href = "dashboard.html"
            }catch (err) {
                console.error("Erro ao criar post", err)
                errorEl.textContent = "Erro ao criar post" + err.message
            }
        })
    })
})