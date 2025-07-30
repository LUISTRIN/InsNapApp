import {db} from "./firebase.js"
import {collection, getDocs, query, orderBy, limit} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js"

document.addEventListener("DOMContentLoaded", async() => {
    const postsContainer = document.getElementById("post-container")

    if(!postsContainer) return

    try {
        const q = query(collection(db, "posts"), orderBy("createdAt", "desc"), limit(10))
        const querySnapshot = await getDocs(q)

        if (querySnapshot.empty) {
            postsContainer.innerHTML = "Nenhum post encontrado"
            return
        }

        querySnapshot.forEach((docSnap) => {
            const post = docSnap.data()
            const postId = docSnap.id

            const postDiv = document.createElement("div")
            postDiv.classList.add("home-post")

            postDiv.innerHTML = `
            <h3>${post.title}</h3>
            <img src="${post.image}" alt="${post.title}" />
            <p>${post.body.substring(0, 100)}...</p>
            <a href="post.html?id=${postId}" class="btn">Ler mais</a>`
            postsContainer.appendChild(postDiv)
        })
    }catch (err) {
        postsContainer.innerHTML = "<p>Erro ao carregar os posts</p>"
        console.log("Erro ao buscar posts:", err)
    }
})